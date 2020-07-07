const Discord = require("discord.js");
const client = new Discord.Client();

const beep = require("../commands/beep");

// a counter so that all the ids are unique
let count = 0;

class Guild extends Discord.Guild {
  constructor(client) {
    super(client, {
      id: count++,
      name: "",
      icon: null,
      splash: null,
      owner_id: "",
      region: "",
      afk_channel_id: null,
      afk_timeout: 0,
      verification_level: 0,
      default_message_notifications: 0,
      explicit_content_filter: 0,
      roles: [],
      emojis: [],
      features: [],
      mfa_level: 0,
      application_id: null,
      system_channel_id: null,
    });
    this.client.guilds.cache.set(this.id, this);
  }
}

class TextChannel extends Discord.TextChannel {
  constructor(guild) {
    super(guild, {
      id: count++,
      type: 0,
    });
    this.client.channels.cache.set(this.id, this);
  }

  send(content) {
    return this.client.actions.MessageCreate.handle({
      id: count++,
      type: 0,
      channel_id: this.id,
      content,
      author: {
        id: "bot id",
        username: "bot username",
        discriminator: "1234",
        bot: true,
      },
      pinned: false,
      tts: false,
      nonce: "",
      embeds: [],
      attachments: [],
      timestamp: Date.now(),
      edited_timestamp: null,
      mentions: [],
      mention_roles: [],
      mention_everyone: false,
    });
  }
}

class Message extends Discord.Message {
  constructor(content, channel, author) {
    super(
      channel.client,
      {
        id: count++,
        type: 0,
        channel_id: channel.id,
        content,
        author,
        pinned: false,
        tts: false,
        nonce: "",
        embeds: [],
        attachments: [],
        timestamp: Date.now(),
        edited_timestamp: null,
        mentions: [],
        mention_roles: [],
        mention_everyone: false,
      },
      channel
    );
  }
}

//Guild = Server
const guild = new Guild(client);
const channel = new TextChannel(guild);

// the user that executes the commands
const user = { id: count++, username: "username", discriminator: "1234" };

describe("beep", () => {
  it("sends Boop", async () => {
    await beep.execute(new Message("!beep", channel, user));
    expect(channel.lastMessage.content).toBe("Boop.");
  });
});
