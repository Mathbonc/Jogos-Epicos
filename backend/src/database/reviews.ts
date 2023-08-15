type Review = {
    id: number;
    author_id: number;
    name: string;
    rating: number;
    description: string;
    date: string;
    categories: string[];
    comments: string[];
    likes: number;
  };

const reviews: Review[] = [
    {
      id: 1,
      author_id: 1,
      name: 'Days Gone',
      rating: 3,
      description: 'Muito legal, amei matar as hordas!',
      date: '2021-01-01',
      categories: ['Zumbi', 'RPG'], 
      comments: ['Muito bom mesmo!', 'Jogo muito bom, recomendo!'],
      likes: 2,
    },
    {
      id: 2,
      author_id: 1,
      name: 'God of War',
      rating: 5,
      description: 'Jogo muito bom, recomendo!',
      date: '2021-05-03',
      categories: ['Ação', 'Aventura', 'RPG'],
      comments: ['Muito bom mesmo!', 'Jogo muito bom, recomendo!'],
      likes: 5,
    },
    {
      id: 3,
      author_id: 2,
      name: 'The Last of Us',
      rating: 4,
      description: 'Jogo muito dificil, mas muito bom!',
      date: '2022-01-01',
      categories: ['Ação', 'Aventura', 'Zumbi', 'RPG'],
      comments: ['Muito bom mesmo!', 'Jogo muito bom, recomendo!'],
      likes: 3,
    },
    {
      id: 4,
      author_id: 2,
      name: 'No Man\'s Sky',
      rating: 3,
      description: 'MineCraft no espaço, muito bom!',
      date: '2020-08-01',
      categories: ['Aventura', 'RPG', 'Sobrevivência'],
      comments: ['Odiei o jogo!'],
      likes: 1,
    }
  ];

export default reviews;