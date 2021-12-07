import moment from 'moment';
import List from 'list.js';

/* eslint-disable no-undef */

// MENU TOGGLES
$('.menu-button').on('click', function() {
  $('.menu').hasClass('open') ? $('.menu').removeClass('open') : $('.menu').addClass('open');
});

$('.menu-nav__list-link').on('click', function() {
  $('.menu').removeClass('open');
});

// DUOTONE
function convertToDueTone(color1, color2) {
  const matrix = document.querySelector('feColorMatrix');
  let value = [];
  value = value.concat([color1[0] / 256 - color2[0] / 256, 0, 0, 0, color2[0] / 256]);
  value = value.concat([color1[1] / 256 - color2[1] / 256, 0, 0, 0, color2[1] / 256]);
  value = value.concat([color1[2] / 256 - color2[2] / 256, 0, 0, 0, color2[2] / 256]);
  value = value.concat([0, 0, 0, 1, 0]);
  matrix.setAttribute('values', value.join(' '));
}

// blue-gray
convertToDueTone([255, 255, 255], [176, 196, 222]);

// LIST.JS
const options = {
  valueNames: ['work__project-title', { data: ['order'] }, 'date'],
};

const projectList = new List('projectList', options);

$('#search-field').on('keyup', function() {
  const searchString = $(this).val();
  projectList.search(searchString);
});

$('#sort-fav').on('click', function() {
  projectList.sort('order', { order: 'asc' });
});

$('#sort-chron').on('click', function() {
  projectList.sort(
    'date',
    {
      sortFunction: function(a, b) {
        if ((a._values.date === 'Ongoing') !== (b._values.date === 'Ongoing')) {
          return a._values.date === 'Ongoing' ? -1 : 1;
        }
        return moment(b._values.date, 'MMM YY').diff(moment(a._values.date, 'MMM YY'));
      },
    },
    { order: 'desc' },
  );
});
