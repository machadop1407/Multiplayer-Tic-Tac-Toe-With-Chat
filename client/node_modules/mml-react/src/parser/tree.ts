import { ReactElement } from 'react';
import { XmlElement } from '@rgrove/parse-xml';

import { MMLTag } from './MMLTag';
import { converters as defaultConverters, ConvertorType } from './converters';

/** The type attribute of <mml> determine how its inner content is visually displayed */
export type RootType = 'card';

/**
 * Tree - The tree object for MML tags
 */
export class Tree {
  converters: Record<string, ConvertorType>;
  node: XmlElement;
  children: MMLTag[];
  reactElements: ReactElement[];
  name?: string;
  type?: RootType;

  constructor(node: XmlElement, children: MMLTag[], customConvertors?: Record<string, ConvertorType>) {
    this.converters = { ...defaultConverters, ...customConvertors };
    this.node = node;
    this.children = children;
    this.reactElements = this.toReact();

    this.name = node.attributes.name;
    this.type = node.attributes.type as RootType;
  }

  /**
   * convert all nodes to react and maintain the hierarchy
   */
  toReact(parent: Tree | MMLTag = this) {
    const reactNodes: ReactElement[] = [];

    (parent.children || []).forEach((child, i) => {
      const converter = this.converters[child.name];
      if (!converter || !Object.hasOwnProperty.call(this.converters, child.name)) {
        throw Error(
          `Converter not found for tag ${child.name}, Available converters are ${Object.keys(this.converters)}`,
        );
      }

      const children = this.toReact(child);
      child.key = `tag-${child.name}-position-${i}`;
      reactNodes.push(converter(child, children));
    });

    return reactNodes;
  }
}
