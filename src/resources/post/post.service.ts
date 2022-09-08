import PostModel from '@/resources/post/post.model';
import {
  DeletePostInput,
  EditPostInput,
  Post,
} from '@/resources/post/post.interface';

class PostService {
  private post = PostModel;

  /**
   * Create a new post
   */
  public async create(title: string, body: string): Promise<Post> {
    try {
      const post = await this.post.create({ title, body });
      return post;
    } catch (e) {
      throw new Error('Unable to create a post.');
    }
  }

  /**
   * Show all posts
   */
  public async findAll(): Promise<Post[]> {
    try {
      const posts = await this.post.find({});
      return posts;
    } catch (e) {
      throw new Error('Cannot find all posts');
    }
  }

  /**
   * Find a post by id
   */
  public async findById(id: string): Promise<Post | null | undefined> {
    try {
      const post = await this.post.findById(id);
      return post;
    } catch (e) {
      throw new Error('Cannot find a post by id');
    }
  }

  /**
   * Find a post by title
   */
  public async findByTitle(
    title: string | undefined
  ): Promise<Post | null | undefined> {
    try {
      const post = await this.post.findOne({ title }).exec();
      return post;
    } catch (e) {
      throw new Error('Cannot find a post by title');
    }
  }
  /**
   * Update a post
   */
  public async editPost(editPostInput: EditPostInput): Promise<void> {
    try {
      const { id, title, body } = editPostInput;
      const postExisted = await this.post.exists({ _id: id });
      if (!postExisted) {
        throw new Error('Post not found');
      }
      await this.post.findByIdAndUpdate(id, {
        title,
        body,
      });
    } catch (e) {
      throw new Error('Cannot edit a post');
    }
  }

  /**
   * Delete a post
   */
  public async deletePost(deletePostInput: DeletePostInput): Promise<void> {
    try {
      const { id } = deletePostInput;
      const postExisted = await this.post.exists({ _id: id });
      if (!postExisted) {
        throw new Error('Post not found');
      }
      await this.post.findByIdAndDelete(id);
    } catch (e) {
      throw new Error('Cannot delete a post');
    }
  }
}

export default PostService;
