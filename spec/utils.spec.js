const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("Takes an empty array and returns an empty array", () => {
    const input = [];
    const actual = formatDates(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("Takes an array with object containing unformatted data key value and returns an array with a formatted date", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("Takes an array with objects containing unformatted data key value and returns an array with objects containing a formatted dates", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body: "I hate streaming eyes even more",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1353674163389
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      },
      {
        body: "I hate streaming eyes even more",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: new Date(1353674163389)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("Test for not mutating input data", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    expect(input).to.eql([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ]);
  });
});

describe("makeRefObj", () => {
  it("Takes an empty array and returns an empty object", () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("Takes an array with one object and returns a reference object with title as a property and article_id as value ", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
        article_id: 1
      }
    ];
    const actual = makeRefObj(input);
    const expected = { "Running a Node App": 1 };
    expect(actual).to.eql(expected);
  });
  it("Takes an array with objects and returns a reference objects with title as a property and article_id as value ", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
        article_id: 1
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346,
        article_id: 2
      }
    ];
    const actual = makeRefObj(input);
    const expected = {
      "Running a Node App": 1,
      "22 Amazing open source React projects": 2
    };
    expect(actual).to.eql(expected);
  });
});

describe("formatComments", () => {
  it("Takes an empty array and object nad returns an empty array", () => {
    const input = [];
    const articleRef = {};
    const actual = formatComments(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("Takes an array with an object and a reference object and returns a formated arrray", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const articleRef = { "Making sense of Redux": 1 };
    const actual = formatComments(input, articleRef);
    const expected = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        article_id: 1,
        author: "grumpy19",
        votes: 7,
        created_at: new Date(1478813209256)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("Test for not mutating input data", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];

    expect(input).to.deep.equal([
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ]);
  });
});
