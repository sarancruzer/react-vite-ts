import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, FieldProps } from 'formik';
import * as Yup from 'yup';
import { signup } from '../../api/userApi';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import './Signup.css';

interface SignupFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignupFormValues = {
  username: "",
  password: "",
  confirmPassword: "",
};


const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

const onSubmit = async (
  values: SignupFormValues,
  { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: Partial<SignupFormValues>) => void }
) => {
  const navigate = useNavigate();
  try {
    const data = await signup(values);
    console.log('🚀 ~ file: Signup.tsx:39 ~ onSubmit={ ~ data:', data);
    navigate('/login');
  } catch (error) {
    setErrors({ username: 'Signup failed. Please try again.' });
  }
  setSubmitting(false);
};

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="p-text-center">Sign Up</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="p-field">
                <Field name="username">
                  {({ field }: FieldProps) => (
                    <div className="p-float-label">
                      <InputText id="username" {...field} className={touched.username && errors.username ? 'p-invalid' : ''} />
                      <label htmlFor="username">Username</label>
                    </div>
                  )}
                </Field>
                {touched.username && errors.username ? <Message severity="error" text={errors.username} /> : null}
              </div>

              <div className="p-field">
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <div className="p-float-label">
                      <InputText id="password" {...field} className={touched.password && errors.password ? 'p-invalid' : ''} />
                      <label htmlFor="password">Password</label>
                    </div>
                  )}
                </Field>
                {touched.password && errors.password ? <Message severity="error" text={errors.password} /> : null}
              </div>

              <div className="p-field">
                <Field name="confirmPassword">
                  {({ field }: FieldProps) => (
                    <div className="p-float-label">
                      <InputText id="confirmPassword" {...field} className={touched.confirmPassword && errors.confirmPassword ? 'p-invalid' : ''} />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                  )}
                </Field>
                {touched.confirmPassword && errors.confirmPassword ? <Message severity="error" text={errors.confirmPassword} /> : null}
              </div>

              <div className="p-d-flex p-jc-center">
                <Button type="submit" label="Sign Up" className="p-button-primary" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
