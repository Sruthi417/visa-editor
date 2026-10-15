"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { QuoteDownIcon } from "@hugeicons/core-free-icons";

import "./Review.scss";

type ReviewItem = {
  name: string;
  location: string;
  rating: string;
  text: string;
  date: string;
  // Drop the image files into /public/reviews with these names.
  avatar: string;
};

const reviews: Record<"left" | "center" | "right", [ReviewItem, ReviewItem]> = {
  // Each column holds one large card and one small card.
  left: [
    {
      name: "Priya Nair",
      location: "Kochi, India",
      rating: "5.0",
      text: "I needed a passport photo for a visa appointment the next morning. I took one on my phone by the window, uploaded it, and the editor fixed the crop and background in seconds. It was accepted at the first attempt and saved me a trip to the studio.",
      date: "24/02/2026",
      avatar: "/reviews/avatar-1.png",
    },
    {
      name: "Rahul Mehta",
      location: "Pune, India",
      rating: "4.5",
      text: "The crop and head size were exactly right for the US visa. I did not have to measure anything myself, and the guide on how to take the photo made a real difference.",
      date: "24/02/2026",
      avatar: "/reviews/avatar-2.png",
    },
  ],
  center: [
    {
      name: "Sara Khan",
      location: "Dubai, UAE",
      rating: "5.0",
      text: "Clean white background in one tap, and the photo checks told me my shoulders were tilted before I submitted. I retook it and it passed.",
      date: "24/02/2026",
      avatar: "/reviews/avatar-3.png",
    },
    {
      name: "Daniel Okoye",
      location: "Lagos, Nigeria",
      rating: "5.0",
      text: "I renewed my passport and had to supply a digital photo. The photo checks warned me my lighting was uneven, so I retook it before paying. The download was high resolution and the print sheet worked perfectly at my local photo shop.",
      date: "24/02/2026",
      avatar: "/reviews/avatar-4.png",
    },
  ],
  right: [
    {
      name: "Emily Carter",
      location: "Manchester, UK",
      rating: "4.0",
      text: "I took photos of my two kids for their passports, which is normally a nightmare. The tips on distance and lighting helped, and the tool handled the framing and background for both. Both photos were accepted, and the price is fair.",
      date: "24/02/2026",
      avatar: "/reviews/avatar-5.png",
    },
    {
      name: "Arjun Rao",
      location: "Bengaluru, India",
      rating: "4.5",
      text: "Picking my country and document type applied the right size straight away. I was done in under two minutes, and the free plan covered everything I needed.",
      date: "24/02/2026",
      avatar: "/reviews/avatar-6.png",
    },
  ],
};

const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Avatar({ name, src }: { name: string; src: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  // The initials sit underneath, so a missing image file still shows a
  // proper avatar instead of a broken-image icon.
  return (
    <span className="review-avatar">
      <span className="review-avatar__initials" aria-hidden="true">
        {initials}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}

function Quote() {
  return (
    <span className="review-quote">
      <HugeiconsIcon icon={QuoteDownIcon} size={22} strokeWidth={1.8} />
    </span>
  );
}

/** The tall card, in the slot where a portrait photo used to be. */
function FeaturedReview({ review }: { review: ReviewItem }) {
  return (
    <article className="review-featured">
      <div className="review-featured__bg" />
      <div className="review-featured__grain" />

      <div className="review-featured__body">
        <Quote />
        <p className="review-featured__text">{review.text}</p>
      </div>

      <div className="review-featured__footer">
        <div className="review-featured__person">
          <Avatar name={review.name} src={review.avatar} />
          <div>
            <strong>{review.name}</strong>
            <span>{review.location}</span>
          </div>
        </div>

        <div className="review-featured__rating">
          <strong>{review.rating}</strong>
          <span>RATING</span>
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <article className="review-card">
      <Quote />

      <p className="review-card__text">{review.text}</p>

      <div className="review-card__footer">
        <div className="review-card__person">
          <Avatar name={review.name} src={review.avatar} />
          <span className="review-card__author">{review.name}</span>
        </div>
        <span className="review-card__date">{review.date}</span>
      </div>
    </article>
  );
}

export default function Review() {
  return (
    <section className="reviews" id="reviews">
      <div className="reviews__container">
        <motion.div
          className="reviews__header"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="reviews__heading" variants={revealFromBottom}>
            <span className="reviews__eyebrow">Reviews</span>
            <h2>What people say about us.</h2>
            <p>
              Thousands of people already use our editor to get passport and
              visa photos accepted first time.
            </p>
          </motion.div>

          <motion.div className="reviews__app" variants={revealFromBottom}>
            <div className="reviews__rating">
              <strong>4.8</strong>
              <div className="reviews__stars" aria-hidden="true">
                ★★★★★
              </div>
              <span>10k+ photos made</span>
            </div>

            <Link href="/upload" className="reviews__cta">
              Get started
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="reviews__columns"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {/* Left: large, small */}
          <motion.div className="reviews__column" variants={revealFromBottom}>
            <FeaturedReview review={reviews.left[0]} />
            <ReviewCard review={reviews.left[1]} />
          </motion.div>

          {/* Center: small, large */}
          <motion.div className="reviews__column" variants={revealFromBottom}>
            <ReviewCard review={reviews.center[0]} />
            <FeaturedReview review={reviews.center[1]} />
          </motion.div>

          {/* Right: large, small */}
          <motion.div className="reviews__column" variants={revealFromBottom}>
            <FeaturedReview review={reviews.right[0]} />
            <ReviewCard review={reviews.right[1]} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
