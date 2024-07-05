
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Btnone } from '../../basic/button';
import { FaStar } from 'react-icons/fa';

const SubmitReviewsfrom = () => {

    const schema = Yup.object().shape({
        username: Yup.string().required('user name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        rating: Yup.string().required('Rating is required'), 
        comment: Yup.string().required('Comment is required').min(10, 'Comment must be at least 10 characters'),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            rating: '',
            email: '',
            comment: '',
        },
    });

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } = methods;


    const onSubmit = (data) => {
        console.log(data);
        reset({
            username: '',
            email: '',
            rating: '',
            comment: ''
        });
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <RatingInput />
                <UsernameInput />
                <EmailInput />
                <CommentInput />

                <div className='mt-6'>
                    <Btnone title="Submit"
                        bgColor="#00A762" type="submit" />
                </div>
            </form>
        </FormProvider>
    );
};

const UsernameInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="username">First Name
                <span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="text"
                id="username"
                placeholder='Enter User Name'
                {...register('username')}
            />
            {errors.username && (
                <p className="text-red-500 mt-1">{errors.username.message}</p>
            )}
        </div>
    );
};

const RatingInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium'>
                Rating <span className='font-medium text-red-500'>*</span>
            </label>
            <select
                className='input_box w-full'
                {...register('rating', {
                    required: 'Please select a rating',
                })}
            >
                <option value="">Select Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
            </select>
            {errors.rating && <p className="text-red-500 mt-1">{errors.rating.message}</p>}
        </div>
    );
};


// const RatingInput = () => {
//     const { register, formState: { errors } } = useFormContext();

//     return (
//         <div className="mt-3">
//             <label className="block text-[#072320] font-dm text-lg capitalize font-medium">rating
//                 <span className=' font-medium text-red-500'>*</span>
//             </label>

//             <div>
//                 {[1, 2, 3, 4, 5].map((value) => (
//                     <label key={value} className="inline-flex items-center px-2">
//                         <input type="radio" value={value} {...register('rating')} />
//                         <span className="ml-1"><FaStar color="#ffc107" /></span>
//                     </label>
//                 ))}
//             </div>
//             {errors.rating && <p className="text-red-500 font-dm mt-1">{errors.rating.message}</p>}
//         </div>
//     );
// };

const EmailInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mt-3">
            <label className="block text-[#072320] font-dm text-lg capitalize font-medium">Email
                <span className=' font-medium text-red-500'>*</span>
            </label>
            <input type="email" className="input_box w-full" placeholder='Enter your email' {...register('email')} />
            {errors.email && <p className="text-red-500 font-dm mt-1">{errors.email.message}</p>}
        </div>
    );
};


const CommentInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (



        <div className="mt-3">
            <label className="block text-[#072320] font-dm text-lg capitalize font-medium">Comment
                <span className=' font-medium text-red-500'>*</span></label>

            <textarea className="input_box w-full h-24" {...register('comment')} placeholder='Enter your Comment' />
            {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
        </div>
    );
};



export default SubmitReviewsfrom;
