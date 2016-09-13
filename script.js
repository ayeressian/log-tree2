(function() {
  'use strict';
  const HOST = 'http://54.149.208.215:8880/';

  // const HOST = 'http://192.168.4.56:4242/';
  const MARGIN_AMOUNT = 50;
  const REFRESH_INTERVAL = 2000;

  let newDatasCheck = new Set();
  let newItemId;

  function recursion(data, level) {
    data.forEach(item => {
      let $main = $('<div>');
      let $div = $('<div>');
      let $img = $('<img>').attr('src', `${HOST}v1/me/serviceFile/${item.id}/lifo_x1_phone.png`).attr('height', 55).attr('width', 55);
      $div.append($img);
      $main.append($div);

      $div = $('<div>');
      $div.html(`<b>${item.name}</b> ${item.description}`);
      $main.append($div);
      $main.css('margin-left', (level * MARGIN_AMOUNT) + 'px');
      $main.attr('id', item.id);
      $('body').append($main);

      if (!newDatasCheck.has(item.id)) {
        newDatasCheck.add(item.id);
        newItemId = item.id;
      }

      if (item.children && item.children.length) recursion(item.children, level + 1);
    });
  }

  let firstTimeLoad = true;

  setInterval(() => {
    $.get(`${HOST}v1/me/serviceTree`, data => {
      $('body > div').remove();
      newItemId = null;
      if(data && data.data) {
        recursion(data.data, 0);
      }
      if (!firstTimeLoad) {
        if (newItemId) {
          location.href = '#';
          location.href = '#' + newItemId;
        }
      } else {
        firstTimeLoad = false;
      }
    });
  }, REFRESH_INTERVAL);
})();
