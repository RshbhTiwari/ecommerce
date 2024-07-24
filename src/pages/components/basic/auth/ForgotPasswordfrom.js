import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Btnone } from '../button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postForgotPasswordUser } from '../../../../redux/slices/loginRegister';

const ForgotPasswordForm = () => { 
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    const {reset, handleSubmit, formState: { isSubmitting, isValid, errors } } = methods;

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = {
                email: data.email,
            };
            dispatch(postForgotPasswordUser(payload, toast, reset));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EmailInput />

                <div className='mt-6'>
                    <Btnone title="Send Password Reset Link"
                        bgColor="#00A762" type="submit" width="100%" loading={isSubmitting} />
                </div>
            </form>
        </FormProvider>
    );
};

const EmailInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-3'>
            <label className='block text-[#072320] font-dm text-lg capitalize font-medium' htmlFor="email">Email<span className=' font-medium text-red-500'>*</span></label>
            <input
                className='input_box w-full'
                type="email"
                id="email"
                placeholder='Enter email address'
                {...register('email')}
            />
            {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
        </div>
    );
};
export default ForgotPasswordForm;
