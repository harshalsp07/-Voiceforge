'use client';

import Link from 'next/link';
import { Plus, Search, BookOpen, MoreVertical, Headphones, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    chapters: 9,
    progress: 72,
    status: 'processing',
    coverGradient: 'from-amber-400 to-copper-600',
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    chapters: 23,
    progress: 100,
    status: 'completed',
    coverGradient: 'from-stone-400 to-stone-700',
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    chapters: 61,
    progress: 0,
    status: 'pending',
    coverGradient: 'from-rose-300 to-rose-600',
  },
];

export default function BooksPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">My Books</h1>
          <p className="font-body text-copper-600 mt-1">Manage your audiobook library</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-copper-400" />
            <Input placeholder="Search books..." className="pl-10" />
          </div>
          <Button className="btn-vintage">
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBooks.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <div className="card-vintage overflow-hidden group cursor-pointer">
              {/* Cover gradient */}
              <div className={`h-40 bg-gradient-to-br ${book.coverGradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white/20" />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant={book.status === 'completed' ? 'success' : book.status === 'processing' ? 'warning' : 'default'}>
                    {book.status}
                  </Badge>
                </div>
                <button className="absolute top-3 left-3 h-8 w-8 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink mb-1 truncate">{book.title}</h3>
                <p className="text-sm font-ui text-copper-500 mb-4">{book.author}</p>

                <div className="flex items-center justify-between text-xs font-ui text-copper-500 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Headphones className="h-3.5 w-3.5" />
                    <span>{book.chapters} chapters</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{book.progress}%</span>
                  </div>
                </div>

                <div className="progress-vintage">
                  <div
                    className="progress-vintage-fill"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Add new book card */}
        <button className="border-2 border-dashed border-cream rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-300 min-h-[280px]">
          <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Plus className="h-6 w-6 text-amber-600" />
          </div>
          <span className="font-ui font-medium text-copper-600">Add New Book</span>
          <span className="text-xs font-ui text-copper-400">PDF, EPUB, or TXT</span>
        </button>
      </div>
    </div>
  );
}
