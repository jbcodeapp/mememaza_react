import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import React from "react";

export default function GalleryPage() {
  return (
    <>
      <Navbar bgOpacity={1} />
      <Gallery
        media={
          <img
            style={{ maxHeight: "100%" }}
            src="https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/387850827_719882920158911_284868204455034546_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=u0TND59JdEgAX9ZX0cx&_nc_ht=scontent.fktm8-1.fna&oh=00_AfCb8ELrBDNbICnw5x9EjvqL1pWpQZuTivRaWc3M9jLXTA&oe=652BE760"
            alt="post"
          />
        }
        title="LL Cool J Presents 'The Streets Win'"
        likes={200}
        mediaType="photo"
        type="reel"
      />
    </>
  );
}
