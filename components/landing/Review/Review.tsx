"use client";

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
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
    },
    {
      name: "Rahul Mehta",
      location: "Pune, India",
      rating: "4.5",
      text: "The crop and head size were exactly right for the US visa. I did not have to measure anything myself, and the guide on how to take the photo made a real difference.",
      date: "24/02/2026",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
    },
  ],
  center: [
    {
      name: "Sara Khan",
      location: "Dubai, UAE",
      rating: "5.0",
      text: "Clean white background in one tap, and the photo checks told me my shoulders were tilted before I submitted. I retook it and it passed.",
      date: "24/02/2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
    },
    {
      name: "Daniel Okoye",
      location: "Lagos, Nigeria",
      rating: "5.0",
      text: "I renewed my passport and had to supply a digital photo. The photo checks warned me my lighting was uneven, so I retook it before paying. The download was high resolution and the print sheet worked perfectly at my local photo shop.",
      date: "24/02/2026",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
    },
  ],
  right: [
    {
      name: "Emily Carter",
      location: "Manchester, UK",
      rating: "4.0",
      text: "I took photos of my two kids for their passports, which is normally a nightmare. The tips on distance and lighting helped, and the tool handled the framing and background for both. Both photos were accepted, and the price is fair.",
      date: "24/02/2026",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
    },
    {
      name: "Arjun Rao",
      location: "Bengaluru, India",
      rating: "4.5",
      text: "Picking my country and document type applied the right size straight away. I was done in under two minutes, and the free plan covered everything I needed.",
      date: "24/02/2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
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

/** Avatar, name and destination: identical on every review card. */
function Person({ review }: { review: ReviewItem }) {
  return (
    <div className="review-person">
      <Avatar name={review.name} src={review.avatar} />
      <div className="review-person__info">
        <strong>{review.name}</strong>
        <span>{review.location}</span>
      </div>
    </div>
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
        <Person review={review} />

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
        <Person review={review} />
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
          </motion.div>
        </motion.div>

        <motion.div
          className="reviews__columns"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div className="reviews__column" variants={revealFromBottom}>
            <FeaturedReview review={reviews.left[0]} />
            <ReviewCard review={reviews.left[1]} />
          </motion.div>

          <motion.div className="reviews__column" variants={revealFromBottom}>
            <ReviewCard review={reviews.center[0]} />
            <FeaturedReview review={reviews.center[1]} />
          </motion.div>

          <motion.div className="reviews__column" variants={revealFromBottom}>
            <FeaturedReview review={reviews.right[0]} />
            <ReviewCard review={reviews.right[1]} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
