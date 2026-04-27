import React from "react";
import useImagePreloader from "../../Hooks/useImagePreloader";
import ListingSkeleton from "../Skeletons/ListingSkeleton";
import HoverCard from "./HoverCard";

export default function ListingCard({ listing }) {
  const image = listing?.images?.[0] || listing?.image || "";
  const { loaded } = useImagePreloader(image);

  if (!loaded) return <ListingSkeleton />;

  return (
    <HoverCard
      id={listing._id}
      name={listing.name}
      image={image}
      averageRating={listing.averageRating}
      reviewCount={listing.reviewCount}
    />
  );
}
