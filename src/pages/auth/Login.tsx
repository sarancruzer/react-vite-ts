import { Formik, Field, Form, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { login } from '../../api/userApi'; // Ensure this path is correct
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import './Login.css';

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = { username: '', password: '' };

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  // .email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});

const handleSubmit = async (
  values: LoginFormValues,
  { setSubmitting }: FormikHelpers<LoginFormValues>
) => {
  try {
    const data = await login(values);
    console.log('🚀 ~ file: Login.tsx:29 ~ data:', data)
  } catch (error) {
    console.log('🚀 ~ file: Login.tsx:30 ~ error:', error)
  }
  setSubmitting(false);
};

const Login = () => {
  return (
    <div className="login-container">
      <div className="card p-shadow-3" style={{ width: '30rem' }}>
        <h2 className="p-text-center">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="p-field p-grid">
                <label htmlFor="username" className="p-col-12 p-md-2">Username</label>
                <div className="p-col-12 p-md-10">
                  <Field name="username">
                    {({ field }: FieldProps) => (
                      <InputText id="username" {...field} className={touched.username && errors.username ? 'p-invalid' : ''} />
                    )}
                  </Field>
                  {touched.username && errors.username ? <Message severity="error" text={errors.username} /> : null}
                </div>
              </div>
              <div className="p-field p-grid">
                <label htmlFor="password" className="p-col-12 p-md-2">Password</label>
                <div className="p-col-12 p-md-10">
                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <Password id="password" {...field} feedback={false} className={touched.password && errors.password ? 'p-invalid' : ''} />
                    )}
                  </Field>
                  {touched.password && errors.password ? <Message severity="error" text={errors.password} /> : null}
                </div>
              </div>
              <div className="p-d-flex p-jc-center">
                <Button type="submit" label="Login" className="p-button-primary" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
