export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: Block[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

const p = (text: string): Block => ({ type: "p", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });

const UPDATED = "October 17, 2026";

export const terms: LegalDocument = {
  eyebrow: "Legal",
  title: "Terms of Service",
  intro:
    "These terms explain how you can use FlyFrame to create passport and visa photos, and what you can expect from us in return. Please read them before you upload a photo or place an order.",
  updated: UPDATED,
  sections: [
    {
      id: "acceptance",
      title: "Accepting these terms",
      blocks: [
        p(
          "By using FlyFrame you agree to these terms. If you do not agree with them, please do not use the service.",
        ),
        p(
          "You must be old enough to enter into a contract where you live. If you are preparing a photo for a child, you must be their parent or legal guardian.",
        ),
      ],
    },
    {
      id: "service",
      title: "What FlyFrame does",
      blocks: [
        p(
          "FlyFrame turns an everyday photo into a passport or visa photo. It crops and resizes the picture to the size of the document you choose, can replace the background where the document allows it, checks the result against the published requirements, and saves it as a file you can download or have printed.",
        ),
        p(
          "The requirements for each country and document are typical values that we keep as accurate as we can. Authorities change their rules, so always confirm them with the official issuing authority before you submit.",
        ),
      ],
    },
    {
      id: "no-guarantee",
      title: "No guarantee of acceptance",
      blocks: [
        p(
          "Final acceptance of a photo is always decided by the issuing authority, not by FlyFrame. The checks we show are an aid and not a promise that your application will be approved.",
        ),
        p(
          "Some countries, including Australia, Canada and New Zealand, only accept an unaltered photo, where cropping is the only change allowed and removing or replacing the background is prohibited. It is your responsibility to follow the rules of the country you apply to and to take a photo that meets them.",
        ),
      ],
    },
    {
      id: "your-photos",
      title: "Your photos",
      blocks: [
        p(
          "You keep all rights to the photos you use with FlyFrame. We do not claim ownership of them.",
        ),
        p(
          "Photos are processed on your own device, in your browser. They are not uploaded to our servers to be edited. You confirm that you have the right to use every photo you add, and that you have the permission of anyone who appears in it.",
        ),
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      blocks: [
        p("When you use FlyFrame you agree not to:"),
        ul(
          "use the service to create a photo of someone who has not given permission, or to misrepresent who a person is;",
          "use the photos to commit fraud or to support an application that contains false information;",
          "upload anything unlawful or that infringes the rights of others;",
          "interfere with the service, attempt to get around its limits, or copy it at scale.",
        ),
      ],
    },
    {
      id: "orders",
      title: "Orders and payment",
      blocks: [
        p(
          "You can order a digital photo, a digital photo with prints, and optional extras. The price of each item and the total are shown before you pay. Prices may change over time, but the price shown when you pay is the price you are charged.",
        ),
        p(
          "Payments are handled by third-party payment providers. We do not store your full card details. You agree to provide accurate information and to use only a payment method that you are allowed to use.",
        ),
      ],
    },
    {
      id: "delivery",
      title: "Digital files and printed photos",
      blocks: [
        p(
          "Your digital photo is available to download once your payment is confirmed.",
        ),
        p(
          "If you order prints, we send them to the delivery address you give us. The delivery time we show is an estimate and not a guarantee, because carriers can be delayed. Please check your address carefully, since we cannot be responsible for prints sent to an address that was entered incorrectly.",
        ),
      ],
    },
    {
      id: "intellectual-property",
      title: "Our content",
      blocks: [
        p(
          "The FlyFrame name, logo, design, text and software belong to FlyFrame or its licensors and are protected by law. You may use the service for your own purposes, but you may not copy, resell or modify it without our written permission.",
        ),
      ],
    },
    {
      id: "liability",
      title: "Disclaimers and liability",
      blocks: [
        p(
          "FlyFrame is provided as it is and as it is available. We work to keep it reliable and accurate, but we cannot promise that it will always be available, free of errors, or that a photo will be accepted by an authority.",
        ),
        p(
          "To the extent the law allows, FlyFrame is not liable for indirect or consequential losses, including a rejected application, missed travel, or fees paid to an authority. Nothing in these terms limits any right you have by law that cannot be limited.",
        ),
      ],
    },
    {
      id: "changes",
      title: "Changes to the service and these terms",
      blocks: [
        p(
          "We may improve or change FlyFrame, and we may update these terms from time to time. When we do, we will change the date at the top of this page. If you keep using the service after a change, you accept the updated terms.",
        ),
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [
        p(
          "If you have a question about these terms or about an order, please get in touch with us through the details on our website. For how we handle your information, see our Privacy Policy.",
        ),
      ],
    },
  ],
};

export const privacy: LegalDocument = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "Your photo is personal. This page explains what FlyFrame does with your information, which is as little as possible, and the choices you have.",
  updated: UPDATED,
  sections: [
    {
      id: "overview",
      title: "In short",
      blocks: [
        ul(
          "Your photo is processed on your device and is not uploaded to our servers to be edited.",
          "We only ask for personal details that an order needs, such as your email and, for prints, a delivery address.",
          "We do not sell your personal information.",
        ),
      ],
    },
    {
      id: "information",
      title: "Information we handle",
      blocks: [
        p("Depending on how you use FlyFrame, the information involved can include:"),
        ul(
          "Your photo and the photo we prepare from it. These stay on your device while you edit them.",
          "The country and document type you choose.",
          "Your email address, so we can send your order confirmation.",
          "For printed photos: your name, street address, city, region, postal code, country and, if you add one, your phone number.",
          "Payment details, which you enter with the payment provider and which we do not store.",
          "Basic technical data such as your IP address and browser, which is created whenever you visit a website.",
        ),
      ],
    },
    {
      id: "photos-on-device",
      title: "Your photos stay on your device",
      blocks: [
        p(
          "Finding the face, cropping, replacing the background, resizing and checking your photo all happen in your browser. The models used for this are loaded from our own site, and your picture is not sent anywhere to be edited.",
        ),
        p(
          "When you close the window, the photo you were working on is discarded. We do not keep a copy of it.",
        ),
      ],
    },
    {
      id: "use",
      title: "How we use your information",
      blocks: [
        ul(
          "To prepare your photo to the requirements of your chosen document.",
          "To process your order, send you a confirmation and deliver your prints.",
          "To answer your questions and help with problems with an order.",
          "To keep the service secure and to prevent misuse.",
          "To meet our legal obligations, for example for tax and accounting.",
        ),
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      blocks: [
        p(
          "We do not sell your personal information. We share it only with the providers who help us run the service, and only what they need:",
        ),
        ul(
          "payment providers, who take your payment;",
          "printing and delivery partners, who receive your name and address to send your prints;",
          "hosting and infrastructure providers, who keep the website running;",
          "authorities or others where the law requires it.",
        ),
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services on our site",
      blocks: [
        p(
          "Some parts of the website load resources from other companies. Your browser contacts them directly, and they may see your IP address:",
        ),
        ul(
          "Google Fonts, which provides the fonts used on the site;",
          "Unsplash, which provides some of the profile pictures shown with reviews.",
        ),
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        p(
          "FlyFrame does not use advertising or tracking cookies. If we add analytics or other tools in the future, we will update this page and ask for your consent where the law requires it.",
        ),
      ],
    },
    {
      id: "retention",
      title: "How long we keep information",
      blocks: [
        p(
          "We keep order information only for as long as we need it to provide your order, to handle questions about it, and to meet legal and accounting requirements. After that we delete it or remove anything that identifies you.",
        ),
      ],
    },
    {
      id: "rights",
      title: "Your choices and rights",
      blocks: [
        p(
          "Depending on where you live, you may have the right to ask us for a copy of your personal information, to correct it, to delete it, to object to how we use it, or to withdraw a consent you gave. To use any of these rights, please contact us. You can also complain to your local data protection authority.",
        ),
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        p(
          "FlyFrame is not aimed at children. A photo of a child should be taken and uploaded by a parent or legal guardian, who is responsible for it.",
        ),
      ],
    },
    {
      id: "security",
      title: "Keeping information safe",
      blocks: [
        p(
          "Because your photo is edited on your device, it is not stored on our servers. We use reasonable technical and organisational measures to protect the information we do handle. No method of transmitting or storing information is completely secure, so we cannot guarantee absolute security.",
        ),
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        p(
          "We may update this policy from time to time. When we do, we will change the date at the top of this page.",
        ),
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [
        p(
          "If you have a question about this policy or want to use your rights, please get in touch with us through the details on our website.",
        ),
      ],
    },
  ],
};
