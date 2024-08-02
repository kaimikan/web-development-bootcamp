heading = document.firstElementChild.lastElementChild.firstElementChild;
console.log(heading);

heading.innerHTML = '<em>TEST</em>';

thirdListItem = document.getElementsByTagName('li')[2];
thirdListItem.innerHTML = 'changed list item';

btn = document.getElementById('btn');
btn.innerHTML = 'CLICK';
btn.style.backgroundColor = 'grey';

// query selector works like css selection pretty much
btnAgain = document.querySelector('#btn'); //.name for class or nothing for tag name
btnAgain.innerHTML = 'CLICK2';

link = document.querySelector('li a');
link.innerHTML = 'g00gle';
link.style.color = 'green';

allListItems = document.querySelectorAll('li');
console.log(allListItems);

// HTML DOM Style Object Properties
// https://www.w3schools.com/jsref/dom_obj_style.asp

document.querySelector('#btn').classList.add('invisible'); //remove('invisible'); //toggle('invisible');

console.log(document.querySelector('a').attributes);
console.log(document.querySelector('a').getAttribute('href'));

document.querySelector('a').setAttribute('href', 'https://www.bing.com/');
