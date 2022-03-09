import React from 'react';
import renderer from 'react-test-renderer';
import { SourceToXML, XMLtoMMLTree } from './parser';

const examples = [
  {
    name: 'Buttons',
    description: 'Different buttons styles',
    mml: `
      <mml name="support">
        <md>Just showing \`button\` *variants*:</md>
        <button name="action" value="Activate">Regular button</button>
        <md>Button with \`icon\` and text:</md>
        <button name="action" value="Activate" icon="shopping_cart">With icon</button>
        <md>Icon only button:</md>
        <button name="action" value="Activate" icon="shopping_cart"></button>
        <md>Button \`floating\` variant:</md>
        <button variant="floating" name="action" value="Activate">Floating button</button>
      </mml>`,
  },
  {
    name: 'ButtonFloating',
    description: 'Different buttons list style',
    mml: `
      <mml name="support">
        <md>Just showing \`button_list\` \`floating\` **variant**:</md>
        <button_list variant="floating">
          <button variant="floating" name="side" value="yes">Yes!</button>
          <button variant="floating" name="side" value="no">No, thanks</button>
        </button_list>
      </mml>`,
  },
  {
    name: 'Simple Support',
    description: 'The most basic example is adding simple buttons to your message that help automate common tasks',
    mml: `
      <mml name="support">
        <text>It looks like your credit card isn't activated yet, activate it now:</text>
        <button name="action" value="Activate">Activate Card</button>
      </mml>`,
  },
  {
    name: 'Out of stock',
    description: "Sorry we're currently out of fries, what would you like as a side?",
    mml: `
      <mml name="food_order">
        Sorry we're currently out of fries, what would you like as a side?
        <button_list>
          <button name="side" value="salad">Salad</button>
          <button name="side" value="potatoes">Baked Potatoes</button>
          <button name="side" value="fried_pickles">Fried Pickles</button>
        </button_list>
      </mml>`,
  },
  {
    name: 'Simple Counts',
    description: 'Counts with a mobile friendly input',
    mml: `
      <mml name="counts" type="card">
        <text>How many donuts do you want for lunch?</text>
        <image src="https://images.unsplash.com/photo-1527904324834-3bda86da6771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=80" />
        <number name="donuts" value="3" />
        <button name="confirm" value="Confirm">Confirm</button>
      </mml>`,
  },
  {
    name: 'Support and Rich Data',
    description: 'common tasks',
    mml: `
      <mml name="support">
        <text>Did you authorize these last 3 transactions on your account?</text>
        <row>
            <col width="4">$15</col>
            <col width="8">Oren's Hummus</col>
        </row>
        <row>
            <col width="4">$1000</col>
            <col width="8">Apple monitor stand</col>
        </row>
        <row>
            <col width="4">$60</col>
            <col width="8">Epic Games Skins</col>
        </row>
        <button name="authorized" value="yes">Yes</button>
        <button name="authorized" value="yes">No</button>
      </mml>`,
  },
  {
    name: 'Support Data Input',
    description: 'Structured data input without leaving the chat UI',
    mml: `
      <mml>
        <md>Happy to setup your new credit card application, what's your **yearly** family income?</md>
        <input type="text" name="email" />
        <input type="hidden" name="secret" value="secret" />
        <button name="send" value="submit">Submit</button>
      </mml>`,
  },
  {
    name: 'Gigs',
    description: 'A simple gig scheduling workflow for referals',
    mml: `
      <mml name="gigs">
        <text>Hi Jack, I'm painting John's house, looks like they also need some plumbing work, do any of these times work for you on Saturday?</text>
        <button_list>
          <button name="times" value="9:30">9:30</button>
          <button name="times" value="10:00">10:00</button>
          <button name="times" value="11:30">11:30</button>
          <button name="times" value="nope">Nope</button>
        </button_list>
      </mml>`,
  },
  {
    name: 'Advanced Scheduling',
    description: 'Datetime picker with availability using ical',
    mml: `
      <mml>
        <text>When would you like to schedule your massage?</text>
        <scheduler name="massage_appointment" duration="30" timeInterval="15" selected="2020-11-16T10:30:00.000Z"/>
        <button name="action" value="reserve">Reserve</button>
      </mml>`,
  },
  {
    name: 'Date Confirmation',
    description: 'Add to calendar UI',
    mml: `
      <mml>
        <text>Your massage appointment has been confirmed!</text>
        <add_to_calendar title="Massage with Jessica" start="2019-12-24T14:42:54.148Z" end="2019-12-24T15:42:54.148Z" />
      </mml>`,
  },
  {
    name: 'E-commerce',
    description: 'Carousel style layout for intuitive selection on mobile',
    mml: `
      <mml>
        <md>Here are some front bumpers! that will fit your **2018-2019 JL**!</md>
        <carousel>
          <item>
            <image src="https://turn5.scene7.com/is/image/Turn5/J107329-JL?wid=250&amp;hei=187&amp;op_usm=0.8,1,10,0" />
            <text>Barricade Adventure HD Front Bumper</text>
            <md>**$404.99**</md>
            <button url="https://www.extremeterrain.com/barricade-adventure-hd-front-bumper-2018-jl.html">View Product</button>
          </item>
          <item>
            <image src="https://turn5.scene7.com/is/image/Turn5/J116651?wid=250&amp;hei=187&amp;op_usm=0.8,1,10,0" />
            <text>Barricade Adventure HD Front Bumper w/ LED Fog Lights &amp; 20 in. LED Light Bar</text>
            <md>**$529.99**</md>
            <button url="https://www.extremeterrain.com/barricade-adventure-hd-front-bumper-w-led-fog-lights-20-led-light-bar-0718-wrangl.html">View Product</button>
          </item>
          <item>
            <image src="https://turn5.scene7.com/is/image/Turn5/J127063-JL?wid=250&amp;hei=187&amp;op_usm=0.8,1,10,0" />
            <text>Barricade HD Front Bumper w/ 20 in. Light Bar</text>
            <md>**$549.99**</md>
            <button url="https://www.extremeterrain.com/barricade-hd-front-bumper-w-20-light-bar-2018-jl.html">View Product</button>
          </item>
          <item>
            <image src="https://turn5.scene7.com/is/image/Turn5/J116311?wid=250&amp;hei=187&amp;op_usm=0.8,1,10,0" />
            <text>RedRock 4x4 Avenger Full Width Front Bumper w/o Winch Plate</text>
            <md>**$729.99**</md>
            <button url="https://www.extremeterrain.com/redrock-4x4-avenger-full-width-front-bumper-w-o-winch-mount-0718-jk.html">View Product</button>
          </item>
        </carousel>
      </mml>`,
  },
];

describe('examples', () => {
  examples.forEach(({ name, mml }) => {
    it(`${name} example should work`, () => {
      const nodes = SourceToXML(mml);
      expect(nodes).toMatchSnapshot();

      const tree = XMLtoMMLTree(nodes);
      expect(tree).toMatchSnapshot();
      expect(tree.reactElements).toMatchSnapshot();

      expect(
        renderer
          .create(<>{tree.reactElements}</>, {
            // let virtuoso render in jest env
            createNodeMock: (element: React.ReactElement) => {
              if (element.type === 'div') return { addEventListener() {} };
              return null;
            },
          })
          .toJSON(),
      ).toMatchSnapshot();
    });
  });
});
