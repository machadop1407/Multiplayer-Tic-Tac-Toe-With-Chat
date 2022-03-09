import React from 'react';
import renderer from 'react-test-renderer';
import { SourceToXML, XMLtoMMLTree } from './parser';

test('mml name and simple text field', () => {
  const mml = '<mml name="john">hi</mml>';
  const nodes = SourceToXML(mml);
  expect(nodes).toMatchSnapshot();

  const tree = XMLtoMMLTree(nodes);
  expect(tree).toMatchSnapshot();
  expect(tree.name).toEqual('john');
  expect(tree.type).toBeUndefined();

  expect(tree.children.length).toBe(1);
  expect(tree.reactElements).toMatchSnapshot();

  expect(renderer.create(<>{tree.reactElements}</>).toJSON()).toMatchSnapshot();
});

test('mml with type', () => {
  const mml = '<mml type="card">hi</mml>';
  const nodes = SourceToXML(mml);
  expect(nodes).toMatchSnapshot();

  const tree = XMLtoMMLTree(nodes);
  expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual('card');
  expect(tree.children.length).toBe(1);
  expect(tree.reactElements).toMatchSnapshot();

  expect(renderer.create(<>{tree.reactElements}</>).toJSON()).toMatchSnapshot();
});

test('mml with type', () => {
  const mml = '<mml type="card">hi</mml>';
  const nodes = SourceToXML(mml);
  expect(nodes).toMatchSnapshot();

  const tree = XMLtoMMLTree(nodes);
  expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual('card');
  expect(tree.children.length).toBe(1);
  expect(tree.toReact()).toMatchSnapshot();

  expect(renderer.create(<>{tree.toReact()}</>).toJSON()).toMatchSnapshot();
});

test('mml with button', () => {
  const mml = `<mml name="support">
                  <text>It looks like your credit card isn't activated yet, activate it now:</text>
                  <button name="action" value="Activate">Activate Card</button>
               </mml>`;

  const nodes = SourceToXML(mml);
  expect(nodes).toMatchSnapshot();

  const tree = XMLtoMMLTree(nodes);
  expect(tree).toMatchSnapshot();
  expect(tree.name).toEqual('support');
  expect(tree.children.length).toBe(2);
  expect(tree.reactElements).toMatchSnapshot();

  expect(renderer.create(<>{tree.reactElements}</>).toJSON()).toMatchSnapshot();
});

test('simple carousel', () => {
  const mml = '<carousel><item>a</item><item>b</item></carousel>';

  const nodes = SourceToXML(mml);
  expect(nodes).toMatchSnapshot();

  const tree = XMLtoMMLTree(nodes);
  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(1);
  //@ts-ignore
  expect(tree.children[0].children.length).toBe(2);
  expect(tree.reactElements).toMatchSnapshot();

  expect(renderer.create(<>{tree.reactElements}</>).toJSON()).toMatchSnapshot();
});

test('simple input', () => {
  const mml = '<input name="name" value="John" />';

  const nodes = SourceToXML(mml);
  expect(nodes).toMatchSnapshot();

  const tree = XMLtoMMLTree(nodes);
  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(1);
  expect(tree.reactElements).toMatchSnapshot();

  expect(renderer.create(<>{tree.reactElements}</>).toJSON()).toMatchSnapshot();
});

test('invalid MML', () => {
  const mml = '<input name="test" value=1 />';
  expect(() => SourceToXML(mml)).toThrowError(/Attribute value expected/);
});

test('forbid access to object prototype props in mml', () => {
  const mml = '<constructor />';
  const nodes = SourceToXML(mml);
  expect(() => XMLtoMMLTree(nodes)).toThrowError(/Converter not found for tag constructor.+/);
});
