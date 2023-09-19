import React from "react";
import ReactMarkdown from "react-markdown";
import _JSXStyle from "styled-jsx/style";

export const PolicyContainer = () => {
  return (
    <>
      <_JSXStyle id="content">{`
        .jsx-content p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        .jsx-content h3 {
          font-size: 24px;
          line-height: 1.7;
          font-weight: 500;
        }
        .jsx-content a {
          color: blue;
        }
        `}</_JSXStyle>
      <div className="mx-auto my-10 max-w-[800px] rounded-2xl p-4 shadow-lg">
        <h1 className="py-8 text-center text-4xl font-bold">
          Logistics App Privacy Policy
        </h1>
        <ReactMarkdown className="jsx-content">
          {`### 1. Purpose and Scope

Welcome to the Privacy Policy of our logistics app. This policy outlines how we collect, use, and protect personal information when you use our app. We are committed to adhering to privacy and data protection regulations concerning the collection and processing of personal information. This policy applies to all activities related to our app and services.

### 2. Information We Collect

We may collect and store the following types of information when you use the app:

**Personal Information:** This includes name, email address, phone number, and delivery address. We use this information to provide logistics services and to contact you when necessary.

**Shipping Data:** We gather information about orders, shipping schedules, and your location to offer enhanced logistics services and to track the delivery process.

**Usage Data:** We may collect information about your interactions with the app, such as specific feature usage, time spent in the app, and other interactions.

### 3. How We Use Information

We use personal information and collected data to:

**Provide Logistics Services**: Shipping information and related services help us offer a better shipping experience, ensuring your goods are delivered to the correct location and time.

**Customize User Experience**: Usage data helps us understand how you use the app, enabling us to enhance the interface and features to better meet your needs.

**Contact and Support:** We use personal information to reach out to you regarding your account, transactions, and to provide assistance when required.

### 4. Sharing Personal Information

We are committed to not sharing, selling, or exchanging your personal information with any third party unless we have your explicit consent or when required by law to fulfill legal obligations and protect our rights, assets, and security.

### 5. Information Security

We implement technical and organizational security measures to protect personal information from loss, unauthorized access, improper use, unauthorized disclosure, or unlawful alteration.

### 6. Choice and Access Rights

You have the right to access, update, and edit your personal information in the account settings of the app. If you wish to delete your account and personal information, please contact us for further guidance.

### 7. Contact Us

If you have any questions or concerns related to the Privacy Policy or the processing of personal information, please reach out to us at: [iessoftware2023@gmail.com](mailto:iessoftware2023@gmail.com)

We continuously strive to maintain your privacy and data security while providing you with the best logistics experience.`}
        </ReactMarkdown>
      </div>
    </>
  );
};
