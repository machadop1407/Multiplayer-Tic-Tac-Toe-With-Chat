import React, { FC, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import * as linkify from 'linkifyjs';

export const truncate = (input: string, length: number, end = '...') => {
  if (input.length > length) return `${input.substring(0, length - end.length)}${end}`;
  return input;
};

const matchMarkdownLinks = (message: string) => {
  const regexMdLinks = /\[([^[]+)\](\(.*\))/gm;
  const matches = message.match(regexMdLinks);
  const singleMatch = /\[([^[]+)\]\((.*)\)/;

  const links = matches
    ? matches.map((match) => {
        const i = singleMatch.exec(match);
        return i && i[2];
      })
    : [];
  return links;
};

const MDLinkRender: FC<{ href: string; children: ReactElement }> = (props) => {
  if (!props.href || (!props.href.startsWith('http') && !props.href.startsWith('mailto:'))) return props.children;
  return (
    <a href={props.href} target="_blank" rel="nofollow noreferrer noopener">
      {props.children}
    </a>
  );
};

const markDownRenderers = { link: MDLinkRender };

const allowedMarkups: ReactMarkdown.NodeType[] = [
  'html',
  // @ts-ignore
  'root',
  'text',
  'break',
  'paragraph',
  'emphasis',
  'strong',
  'link',
  'list',
  'listItem',
  'code',
  'inlineCode',
  'blockquote',
];

export type MDProps = {
  /** The markdown text */
  text: string;
};

/**
 * MD renders a given text as markdown
 */
export const MD: FC<MDProps> = ({ text }) => {
  if (!text) return null;

  let newText = text;
  let markdownLinks = matchMarkdownLinks(newText);
  // extract all valid links/emails within text and replace it with proper markup
  linkify.find(newText).forEach(({ type, href, value }) => {
    // check if message is already  markdown
    const noParsingNeeded = markdownLinks && markdownLinks.filter((text) => text?.indexOf(href) !== -1);
    if (noParsingNeeded.length > 0) return;

    const displayLink = type === 'email' ? value : truncate(value.replace(/(http(s?):\/\/)?(www\.)?/, ''), 20);
    newText = newText.replace(value, `[${displayLink}](${encodeURI(href)})`);
  });

  return (
    <div className="mml-md">
      <ReactMarkdown
        allowedTypes={allowedMarkups}
        renderers={markDownRenderers}
        source={newText}
        escapeHtml={true}
        unwrapDisallowed={true}
        transformLinkUri={(uri) => (uri.startsWith('app://') ? uri : ReactMarkdown.uriTransformer(uri))}
      />
    </div>
  );
};
