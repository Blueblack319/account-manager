interface Post {
  title: string;
  body: string;
}

interface TitleQuery {
  title: string;
}

interface EditPostInput {
  id: string;
  title: string;
  body: string;
}

interface DeletePostInput {
  id: string;
}

export { Post, TitleQuery, EditPostInput, DeletePostInput };
