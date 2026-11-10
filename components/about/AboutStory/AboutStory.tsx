import Image from "next/image";

import "./AboutStory.scss";

/** Why FlyFrame exists: what makes the photo hard, and what the editor does about it. */
export default function AboutStory() {
  return (
    <section className="ab-story" id="why-flyframe">
      <div className="ab-story__wrap">
        <div className="ab-story__copy">
          <header className="ab-story__head">
            <span>Why FlyFrame</span>
            <h2>Photo rules are strict. Meeting them shouldn&apos;t be hard.</h2>
          </header>

          <div className="ab-story__text">
            <p>
              Every country sets its own photo rules: the size, how big your head should be, the
              background colour and even the file size. A photo that misses one of them can be
              sent back, and you start again.
            </p>
            <p>
              FlyFrame reads those published rules for you. Choose your document and country,
              upload a photo from your phone, and the editor crops, sizes and checks it to that
              specification, so there is nothing to measure or guess.
            </p>
            <p>
              It all happens in your browser. There is no studio to visit, and your photo
              isn&apos;t uploaded to be edited.
            </p>
          </div>
        </div>

        <div className="ab-story__media">
          <Image
            src="/images/guide/guide_photo.png"
            alt="A phone showing a woman taking a selfie, with a scale from wrong to right"
            width={672}
            height={808}
            sizes="(max-width: 900px) 70vw, 380px"
          />
        </div>
      </div>
    </section>
  );
}
