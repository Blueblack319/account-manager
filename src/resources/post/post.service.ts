import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService {
  private post = PostModel;

  /**
   * Create a new post
   */
  public async create(title: string, body: string): Promise<Post> {
    try {
      const post = (await this.post.create({ title, body })) as Post;
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

  /**
   * Delete a post
   */
}

export default PostService;
