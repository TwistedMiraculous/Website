window.onload = function() {
  const images = [
    '/Pages/veiw/Art/imgs/img1.jpg',
    '/Pages/veiw/Art/imgs/img2.jpg',
    '/Pages/veiw/Art/imgs/img3.jpg',
    '/Pages/veiw/Art/imgs/img4.jpg',
    '/Pages/veiw/Art/imgs/img5.jpg',
    '/Pages/veiw/Art/imgs/img3.jpg',
    '/Pages/veiw/Art/imgs/img4.jpg',
    '/Pages/veiw/Art/imgs/img5.jpg',
    '/Pages/veiw/Art/imgs/img2.jpg'
    // Add more image URLs as needed
  ];

  const pins = document.querySelectorAll('.pin img');
  const placeholderImg = 'https://via.placeholder.com/150';

  // Shuffle function to randomize the images array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledImages = shuffle(images.slice()); // Make a copy to avoid mutating the original array
  let currentIndex = 0;

  pins.forEach(function(pin) {
    if (currentIndex < shuffledImages.length) {
      const currentImage = shuffledImages[currentIndex];
      if (currentImage) {
        pin.src = currentImage;
      } else {
        pin.src = placeholderImg;
      }
      currentIndex++;
    }
  });
};

 