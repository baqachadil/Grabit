import React from "react";
import { render } from "react-dom";
import { withFormik } from "formik";

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    dirty
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: "block" }}>
        Email
      </label>
      <input
        id="fullname"
        placeholder="Enter your full Name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.name && touched.name ? "text-input error" : "text-input"
        }
      />
      {errors.name && touched.name && (
        <div className="input-feedback">{errors.name}</div>
      )}
      <input
        id="email"
        placeholder="Enter your email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.email && touched.email ? "text-input error" : "text-input"
        }
      />
      {errors.email && touched.email && (
        <div className="input-feedback">{errors.email}</div>
      )}
      <input
        id="email"
        placeholder="Enter your email"
        type="text"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.phone && touched.phone ? "text-input error" : "text-input"
        }
      />
      {errors.phone && touched.phone && (
        <div className="input-feedback">{errors.phone}</div>
      )}

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ email: "", name: "", phone: "" }),

  // Custom sync validation
  validate: values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.phone.isNumeric()) {
      errors.phone = "Required";
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm" // helps with React DevTools
})(MyForm);

export default MyEnhancedForm;
