"use strict";
const request = require('./request');
const User = require('./user');
const Sensitive = require('./sensitive');
const Message = require('./message');
const Group = require('./group');
const Conversation = require('./conversation');
const Chatroom = require('./chatroom');
const Sms = require('./sms');

let modules = {
	User: User,
	Sensitive: Sensitive,
	Message: Message,
	Group: Group,
	Conversation: Conversation,
	Chatroom: Chatroom,
	Sms: Sms
};

module.exports = function(params) {
	request.init(params);
	return modules;
};