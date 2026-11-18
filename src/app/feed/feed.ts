import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../services/posts';
import { Post } from '../models/post';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {
  private postsService = inject(PostsService);

  posts: Post[] = [];
  nuevoPost: Post = { userId: 1, title: '', body: '' };
  editandoId: number | null = null;
  cargando = false;

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts(): void {
    this.cargando = true;
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 15);
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  guardarPost(): void {
    if (!this.nuevoPost.title.trim() || !this.nuevoPost.body.trim()) return;

    if (this.editandoId !== null) {
      const postActualizado: Post = { ...this.nuevoPost, id: this.editandoId };
      
      this.postsService.updatePost(this.editandoId, postActualizado).subscribe({
        next: () => {
          const index = this.posts.findIndex(p => p.id === this.editandoId);
          if (index !== -1) this.posts[index] = postActualizado;
          this.cancelarEdicion();
        },
        error: () => {
          const index = this.posts.findIndex(p => p.id === this.editandoId);
          if (index !== -1) this.posts[index] = postActualizado;
          this.cancelarEdicion();
        }
      });
    } else {
      this.postsService.createPost(this.nuevoPost).subscribe({
        next: (res) => {
          const postCreado: Post = { ...res, id: Date.now() };
          this.posts.unshift(postCreado);
          this.nuevoPost = { userId: 1, title: '', body: '' };
        }
      });
    }
  }

  seleccionarParaEditar(post: Post): void {
    this.editandoId = post.id!;
    this.nuevoPost = { ...post };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.nuevoPost = { userId: 1, title: '', body: '' };
  }

  eliminarPost(id: number): void {
    this.postsService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== id);
      }
    });
  }
}