import type { Reference } from '../types';

/**
 * Bibliography. Only verifiable publications are listed; DOI, page ranges and
 * URLs are intentionally omitted where they could not be confirmed.
 * Numbers in square brackets in the text (e.g. [1]) refer to `id`.
 */
export const REFERENCES: Reference[] = [
  {
    id: 1,
    kind: 'book',
    citation:
      'Castells M. The Rise of the Network Society. — Oxford : Blackwell Publishers, 1996. (The Information Age: Economy, Society and Culture. Vol. I).',
    note: 'Рус. пер.: Кастельс М. Информационная эпоха: экономика, общество и культура. — М. : ГУ ВШЭ, 2000.',
  },
  {
    id: 2,
    kind: 'textbook',
    citation: 'Giddens A., Sutton P. W. Sociology. — 9th ed. — Cambridge : Polity Press, 2021.',
    note: 'Рус. пер. более раннего издания: Гидденс Э. Социология. — М. : Эдиториал УРСС, 1999.',
  },
  {
    id: 3,
    kind: 'textbook',
    citation: 'Смелзер Н. Социология / пер. с англ. — М. : Феникс, 1994.',
  },
  {
    id: 4,
    kind: 'article',
    citation:
      'boyd d. m., Ellison N. B. Social Network Sites: Definition, History, and Scholarship // Journal of Computer-Mediated Communication. — 2007. — Vol. 13, № 1. — P. 210–230.',
  },
  {
    id: 5,
    kind: 'book',
    citation: 'boyd d. It’s Complicated: The Social Lives of Networked Teens. — New Haven : Yale University Press, 2014.',
  },
  {
    id: 6,
    kind: 'report',
    citation:
      'UNESCO. Media and Information Literate Citizens: Think Critically, Click Wisely! (Media and Information Literacy Curriculum for Educators and Learners). — Paris : UNESCO, 2021.',
  },
  {
    id: 7,
    kind: 'report',
    citation: 'UNICEF. The State of the World’s Children 2017: Children in a Digital World. — New York : UNICEF, 2017.',
  },
  {
    id: 8,
    kind: 'article',
    citation:
      'Orben A., Przybylski A. K. The association between adolescent well-being and digital technology use // Nature Human Behaviour. — 2019. — Vol. 3. — P. 173–182.',
  },
  {
    id: 9,
    kind: 'report',
    citation:
      'Office of the Surgeon General. Social Media and Youth Mental Health: The U.S. Surgeon General’s Advisory. — Washington, DC : U.S. Department of Health and Human Services, 2023.',
  },
  {
    id: 10,
    kind: 'book',
    citation:
      'Twenge J. M. iGen: Why Today’s Super-Connected Kids Are Growing Up Less Rebellious, More Tolerant, Less Happy — and Completely Unprepared for Adulthood. — New York : Atria Books, 2017.',
  },
  {
    id: 11,
    kind: 'book',
    citation: 'Pariser E. The Filter Bubble: What the Internet Is Hiding from You. — New York : Penguin Press, 2011.',
  },
  {
    id: 12,
    kind: 'article',
    citation:
      'Vosoughi S., Roy D., Aral S. The spread of true and false news online // Science. — 2018. — Vol. 359, № 6380. — P. 1146–1151.',
  },
  {
    id: 13,
    kind: 'article',
    citation:
      'Kuss D. J., Griffiths M. D. Social Networking Sites and Addiction: Ten Lessons Learned // International Journal of Environmental Research and Public Health. — 2017. — Vol. 14, № 3. — Art. 311.',
  },
  {
    id: 14,
    kind: 'article',
    citation:
      'Keles B., McCrae N., Grealish A. A systematic review: the influence of social media on depression, anxiety and psychological distress in adolescents // International Journal of Adolescence and Youth. — 2020. — Vol. 25, № 1. — P. 79–93.',
  },
  {
    id: 15,
    kind: 'book',
    citation: 'Goffman E. The Presentation of Self in Everyday Life. — New York : Anchor Books, 1959.',
    note: 'Рус. пер.: Гофман И. Представление себя другим в повседневной жизни. — М. : Канон-Пресс-Ц, 2000.',
  },
  {
    id: 16,
    kind: 'article',
    citation: 'Festinger L. A Theory of Social Comparison Processes // Human Relations. — 1954. — Vol. 7, № 2. — P. 117–140.',
  },
  {
    id: 17,
    kind: 'book',
    citation: 'Haidt J. The Anxious Generation: How the Great Rewiring of Childhood Is Causing an Epidemic of Mental Illness. — New York : Penguin Press, 2024.',
    note: 'Позиция автора дискуссионна; ср. более осторожные выводы в [8].',
  },
];

export const REFERENCE_KIND_LABEL: Record<Reference['kind'], string> = {
  book: 'Монография',
  article: 'Статья',
  report: 'Доклад',
  textbook: 'Учебник',
};
