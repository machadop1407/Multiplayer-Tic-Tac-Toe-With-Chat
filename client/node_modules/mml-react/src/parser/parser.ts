import parseXml from '@rgrove/parse-xml';

import { ConvertorType } from './converters';
import { MMLTag } from './MMLTag';
import { Tree } from './tree';

/**
 * SourceToXML - Takes an MML string and converts it to XML nodes
 *
 * @param {string} source MML tag string
 *
 * @returns {array} an Array of XML nodes
 */
export function SourceToXML(source: string) {
  let src = source.trim();
  // the wrapping MML tags are optional, for parsing simplicity we automatically add them if they are not already there
  if (!src.startsWith('<mml')) src = `<mml>${source}</mml>`;

  // emulate HTML handling of & escaping
  const unescapedAmps = /&(?!amp;|lt;|gt;)/g;
  src = src.replace(unescapedAmps, '&amp;');

  // convert the string to XML nodes
  // this library is relatively lightweight and doesn't do a ton of validation
  return parseXml(src);
}

function convertNodes(nodes: parseXml.XmlNode[]) {
  return nodes.reduce((acc: MMLTag[], node: parseXml.XmlNode) => {
    const element = node as parseXml.XmlElement;
    let children;
    if (element.children) children = convertNodes(element.children);

    let { name } = element;
    if ((node as parseXml.XmlText).type === 'text') {
      if ((node as parseXml.XmlText).text.trim().length) name = 'text';
      else return acc; // skip empty text elements
    }

    acc.push(new MMLTag(name, node as parseXml.XmlElement | parseXml.XmlText, children));
    return acc;
  }, []);
}

/**
 * XMLtoMMLTree - Takes an array of XML nodes and converts it into an MML Tree
 *
 * @param {type} XMLNodes an array of XML nodes
 *
 * @returns {MMLTree} The MML tree
 */
export function XMLtoMMLTree(document: parseXml.XmlDocument, customConvertors?: Record<string, ConvertorType>) {
  if (!document || !document.children || !document.children.length) throw new Error('bad input');

  const mmlNode = document.children[0] as parseXml.XmlElement;
  if (mmlNode.name !== 'mml') throw new Error('missing mml tag');

  return new Tree(mmlNode, convertNodes(mmlNode.children), customConvertors);
}

/**
 * Takes an MML string and returns an MML Tree
 *
 * @param {string} source MML tag string
 *
 *  @returns {Tree} An MML Tree
 */
export function Parse(source: string, customConvertors?: Record<string, ConvertorType>) {
  const XMLNodes = SourceToXML(source);
  return XMLtoMMLTree(XMLNodes, customConvertors);
}
