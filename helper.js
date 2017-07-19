'use strict';

/**
 * Requires
 */
const moment = require('moment');

/**
 * Helper
 */
module.exports = {
  ucWords(string) {
    return string.replace('/\w\S*/g', (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()); // eslint-disable-line no-useless-escape
  },
  formatNumber(x) {
    return x.toString().replace('/\B(?=(\d{3})+(?!\d))/g', ','); // eslint-disable-line no-useless-escape
  },
  formatBytes(bytes, decimals) {
    const b = parseInt(bytes, 10);
    if (b === 0) {
      return '0 Byte';
    }
    const k = 1024;
    const dm = decimals + 1 || 3;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return `${(b / Math.pow(k, i)).toPrecision(dm)} ${sizes[i]}`; // eslint-disable-line no-restricted-properties
  },
  parseCommand(message) {
    const tokens = message.split(' ');
    if (!tokens[0].match(/^\//)) {
      return null;
    }
    const command = [];
    const cmd = tokens.shift();
    const match = cmd.match(/\/(\w*)/);
    if (match.length > 0) {
      command[match[1]] = tokens;
    }
    return command;
  },
  getMessage(message) {
    let m = '';
    if (message) {
      m = message.toString().trim();
    } else {
      m = '';
    }
    return (m.length > 0 ? m : 'N/A');
  },
  formatMessage(title, description, fields) {
    let message = '';

    if (title.length > 0) {
      message = `<strong>${title}</strong>\n`;
    }
    if (description.length > 0) {
      message += `<em>${description}</em>\n`;
    }
    if (fields.length > 0) {
      message += `<pre>${this.parseFields(fields)}</pre>`;
    }

    return message;
  },
  parseFields(fields) {
    const data = [];
    fields.forEach((entry) => {
      if (entry.title && entry.title.length > 0) {
        data.push(`${entry.title}: ${entry.value}`);
      }
    });

    return data.join("\n"); // eslint-disable-line quotes
  },
  validateIp(ip) {
    const matcher = /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/;
    return matcher.test(ip);
  },
};
