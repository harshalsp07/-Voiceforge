'use client';

import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, BookOpen, MoreVertical, Headphones, Clock, Upload, Loader2, X, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { SkeletonCard } from '@/components/ui/skeleton';
import { TiltCard } from '@/components/animations/tilt-card';
import { StaggerContainer, StaggerItem } from '@/components/animations/stagger';
import { useAuth } from '@/hooks/useAuth';
import { useBooks } from '@/hooks/useBooks';
import { useToastContext } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

const coverGradients = [
  'from-amber-400 to-copper-600',
  'from-stone-400 to-stone-700',
  'from-rose-300 to-rose-600',
  'from-emerald-300 to-emerald-600',
  'from-sky-300 to-sky-600',
  'from-violet-300 to-violet-600',
];

function gradientForId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return coverGradients[Math.abs(hash) % coverGradients.length];
}

export default function BooksPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();
  const { books, loading: booksLoading, uploadBook, deleteBook } = useBooks(user?.$id);
  const { toast } = useToastContext();

  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const q = searchQuery.toLowerCase();
    return books.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
    );
  }, [books, searchQuery]);

  const openUpload = () => {
    setError('');
    setShowUpload(true);
  };

  const handleFileSelect = (file: File) => {
    setUploadFile(file);
    if (!title) {
      const name = file.name.replace(/\.[^.]+$/, '');
      setTitle(name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!uploadFile || !title.trim()) {
      setError('Please select a file and enter a title');
      return;
    }

    setUploading(true);
    setError('');

    try {
      await uploadBook(uploadFile, title.trim(), author.trim());
      toast('Book uploaded successfully!', 'success');
      setShowUpload(false);
      setUploadFile(null);
      setTitle('');
      setAuthor('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      toast(message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (bookId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Delete this book?')) return;
    try {
      await deleteBook(bookId);
      toast('Book deleted', 'info');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast(message, 'error');
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <BookOpen className="h-12 w-12 text-copper-300 mx-auto mb-4" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Sign in to manage books</h2>
        <p className="font-body text-copper-600 mb-6">Upload and organize your audiobook library</p>
        <Button className="btn-vintage" onClick={() => router.push('/sign-in')}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.epub,.txt,application/pdf,application/epub+zip,text/plain"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
          e.target.value = '';
        }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">My Books</h1>
          <p className="font-body text-copper-600 mt-1">Manage your audiobook library</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-copper-400" />
            <Input
              placeholder="Search books..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-copper-400 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button className="btn-vintage" onClick={openUpload}>
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        </div>
      </div>

      {booksLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredBooks.length === 0 && !searchQuery ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-20 w-20 rounded-2xl bg-amber-100 items-center justify-center mb-6"
          >
            <BookOpen className="h-10 w-10 text-amber-500" />
          </motion.div>
          <h3 className="font-display text-2xl font-bold text-ink mb-2">Your library is empty</h3>
          <p className="font-body text-copper-600 mb-6 max-w-sm mx-auto">
            Upload your first book to start creating audiobooks with AI narration.
          </p>
          <Button className="btn-vintage" onClick={openUpload}>
            <Upload className="h-4 w-4" />
            Upload Your First Book
          </Button>
        </motion.div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-20">
          <Search className="h-12 w-12 text-copper-300 mx-auto mb-4" />
          <p className="font-body text-copper-600">No books match &ldquo;{searchQuery}&rdquo;</p>
        </div>
      ) : (
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <StaggerItem key={book.$id}>
              <TiltCard maxTilt={6} scale={1.03} className="h-full">
                <Link href={`/books/${book.$id}/audiobook`} className="block h-full">
                  <div className="card-vintage overflow-hidden group cursor-pointer h-full">
                    <div className={cn('h-40 bg-gradient-to-br relative overflow-hidden', gradientForId(book.$id))}>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <BookOpen className="h-16 w-16 text-white/20" />
                      </motion.div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="default">{book.fileType?.toUpperCase() || 'BOOK'}</Badge>
                      </div>
                      <button
                        onClick={(e) => handleDelete(book.$id, e)}
                        className="absolute top-3 left-3 h-8 w-8 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                        aria-label="Delete book"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </button>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-ink mb-1 truncate">{book.title}</h3>
                      <p className="text-sm font-ui text-copper-500 mb-4">{book.author || 'Unknown author'}</p>

                      <div className="flex items-center justify-between text-xs font-ui text-copper-500 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Headphones className="h-3.5 w-3.5" />
                          <span>{book.totalChapters || 0} chapters</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Ready</span>
                        </div>
                      </div>

                      <div className="progress-vintage">
                        <div className="progress-vintage-fill" style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}

          <StaggerItem>
            <button
              onClick={openUpload}
              className="border-2 border-dashed border-cream rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-300 min-h-[280px] w-full"
            >
              <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Plus className="h-6 w-6 text-amber-600" />
              </div>
              <span className="font-ui font-medium text-copper-600">Add New Book</span>
              <span className="text-xs font-ui text-copper-400">PDF, EPUB, or TXT</span>
            </button>
          </StaggerItem>
        </StaggerContainer>
      )}

      <Modal open={showUpload} onClose={() => setShowUpload(false)} title="Upload Book">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <div
          ref={dropZoneRef}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-4',
            isDragging
              ? 'border-amber-400 bg-amber-50/40 scale-[1.02]'
              : 'border-cream hover:border-amber-300 hover:bg-amber-50/20'
          )}
        >
          <motion.div
            animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
            className="flex justify-center mb-2"
          >
            {uploadFile ? (
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-amber-500" />
                <p className="font-ui text-sm text-ink">{uploadFile.name}</p>
              </div>
            ) : (
              <Upload className={cn('h-8 w-8 mx-auto', isDragging ? 'text-amber-500' : 'text-copper-300')} />
            )}
          </motion.div>
          {!uploadFile && (
            <>
              <p className="font-ui font-medium text-ink mb-1">
                {isDragging ? 'Drop your file here' : 'Choose a file or drag it here'}
              </p>
              <p className="text-xs font-ui text-copper-400">PDF, EPUB, or TXT</p>
            </>
          )}
          {uploadFile && (
            <p className="text-xs font-ui text-amber-600 mt-2">Click to change file</p>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-ui font-medium text-ink mb-1.5">Title</label>
            <Input
              placeholder="Book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-ui font-medium text-ink mb-1.5">Author</label>
            <Input
              placeholder="Author name (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setShowUpload(false)}>
            Cancel
          </Button>
          <Button className="flex-1 btn-vintage" onClick={handleUpload} disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
