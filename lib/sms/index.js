"use strict";

const config = require('./api.json');
const verify = require('./verify.json');

const request = require('../request').request;
const utils = require('../utils');

const rename = utils.rename;
const logger = utils.logger;

const getError = utils.getError;
const check = utils.check;

let sendCode = (sendData) => {
	let conf = config.sendCode;
	let error = check({
		api: conf,
		model: 'sendData',
		data: sendData,
		verify: verify.sendData
	});

	if (error) {
		return Promise.reject(error);
	}

	sendData = rename(sendData, {
		phone: 'mobile',
		template_id: 'templateId',
		region: 'region'
	});

	return request({
		domainType: 'sms',
		url: conf.url,
		data: sendData
	}).then(result => {
		return result.text;
	}).catch(error => {
		error = getError({
			code: error,
			errors: conf.response.fail
		});
		logger.log({
			content: error,
			level: 'error',
			pos: 'Sms.sendCode'
		});
		return error;
	});
};

let verifyCode = (verifyData) => {
	let conf = config.verifyCode;
	let error = check({
		api: conf,
		model: 'verifyData',
		data: verifyData,
		verify: verify.verifyData
	});

	if (error) {
		return Promise.reject(error);
	}

	verifyData = rename(verifyData, {
		session_id: 'sessionId',
		code: 'code'
	});

	return request({
		domainType: 'sms',
		url: conf.url,
		data: verifyData
	}).then(result => {
		return result.text;
	}).catch(error => {
		error = getError({
			code: error,
			errors: conf.response.fail
		});
		logger.log({
			content: error,
			level: 'error',
			pos: 'Sms.verifyCode'
		});
		return error;
	});
};

module.exports = {
	sendCode: sendCode,
	verifyCode: verifyCode
};