import './pages/index.css';

const jordanImage = new URL('./images/avatar.jpg', import.meta.url);
const jamesImage = new URL('./images/close_icon.svg', import.meta.url);
const bryantImage = new URL('./images/edit-button.svg', import.meta.url);

const whoIsTheGoat = [
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
];
