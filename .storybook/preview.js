import '../src/app.css';

/** @type { import('@storybook/svelte-vite').Preview } */
const preview = {
  globalTypes: {
    brand: {
      description: 'Brand',
      defaultValue: 'sisal',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'sisal', title: 'Sisal' },
          { value: 'sisalbusiness', title: 'Sisal Business' },
          { value: 'sisalcasino', title: 'Sisal Casino' },
          { value: 'snai', title: 'SNAI' },
          { value: 'pokerstars', title: 'PokerStars' },
          { value: 'eloterie', title: 'eLoterie' },
          { value: 'mdjs', title: 'MDJS' },
          { value: 'millipiyango', title: 'Millî Piyango' }
        ],
        dynamicTitle: true
      }
    },
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },

  decorators: [
    (story, context) => {
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.setAttribute('data-brand', context.globals.brand ?? 'sisal');
        root.setAttribute('data-theme', context.globals.theme ?? 'light');
        document.body.style.background = context.globals.theme === 'dark' ? '#0e141f' : '#ffffff';
      }
      return story();
    }
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'todo'
    }
  }
};

export default preview;
