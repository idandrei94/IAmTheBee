'use client';
import React, {useState} from 'react';
import {useForm, SubmitHandler, ControllerRenderProps} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {postCommentSchema} from '@/models/comment/validators';
import {
  postOrUpdateComment,
  postFakeComment
} from '@/lib/actions/comment.actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';

type Props =
  | {
      movieId: number;
      variant: 'create';
    }
  | {
      movieId: number;
      comment: string;
      variant: 'edit';
      onCancel: () => void;
      commentId: number;
    };

type MovieIdFormField = ControllerRenderProps<
  z.infer<typeof postCommentSchema>,
  'comment'
>;

const CreateCommentForm: React.FC<Props> = (props) => {
  const {movieId, variant} = props;
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof postCommentSchema>>({
    resolver: zodResolver(postCommentSchema),
    defaultValues: {
      movieId: `${movieId}`,
      comment: variant === 'edit' ? props.comment : ''
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof postCommentSchema>> = async (
    data
  ) => {
    setLoading(true);
    const success = await postOrUpdateComment(
      data,
      variant === 'create' ? undefined : props.commentId
    );
    if (success) {
      if (variant === 'create') {
        form.reset({
          comment: '',
          movieId: `${movieId}`
        });
      } else {
        console.log('cancel');
        console.log('qwe');
        props.onCancel();
      }
    }
    setLoading(false);
  };

  return (
    <div className='flex items-start flex-1'>
      <div className='min-w-0 flex-1'>
        <Form {...form}>
          <form
            className='relative'
            onSubmit={form.handleSubmit(onSubmit)}>
            <input
              type='hidden'
              value={`${movieId}`}
            />
            <div className='rounded-lg bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-slate-600'>
              <FormField
                control={form.control}
                name='comment'
                render={({field}: {field: MovieIdFormField}) => (
                  <FormItem>
                    <FormLabel>
                      <label
                        htmlFor='comment'
                        className='sr-only'>
                        Add your comment
                      </label>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        id='comment'
                        placeholder='Add your comment...'
                        className='block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Spacer element to match the height of the toolbar */}
              <div
                aria-hidden='true'
                className='py-2'>
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className='py-px'>
                  <div className='h-9' />
                </div>
              </div>
            </div>

            <div className='absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
              <div className='flex justify-center items-center flex-col gap-1 text-xs'>
                <FormField
                  control={form.control}
                  name='comment'
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/*Somehow the formState isSubmitting fires a stack call late and you can double submit */}
              <div className='shrink-0 flex flex-row gap-3'>
                {variant === 'create' ? (
                  <button
                    type='button'
                    onClick={async () => {
                      setLoading(true);
                      await postFakeComment(movieId, 'bob@ross.com');
                      setLoading(false);
                    }}
                    disabled={loading}
                    className='inline-flex items-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'>
                    Post Fake Comment
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={props.onCancel}
                    disabled={loading}
                    className='inline-flex items-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'>
                    Cancel
                  </button>
                )}
                <button
                  disabled={loading}
                  type='submit'
                  className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  {variant === 'create' ? 'Post' : 'Update'}
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCommentForm;
