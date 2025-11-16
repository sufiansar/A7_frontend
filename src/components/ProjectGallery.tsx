"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const onPop = () => {
      // Always close the gallery on popstate
      setOpen(false);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [open]);

  // Check images after hooks
  if (!images || images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          // Push a history state so the browser back button can close the modal
          try {
            history.pushState({ gallery: true }, "", "");
          } catch (e) {
            // ignore
          }
          setOpen(true);
        }}
        className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-lg transition-colors"
      >
        Gallery
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            // close when clicking on the overlay (outside inner content)
            if (e.target === e.currentTarget) {
              try {
                setOpen(false);
                const state = history.state as { gallery?: boolean } | null;
                if (state && state.gallery) {
                  try {
                    history.replaceState(
                      null,
                      "",
                      window.location.pathname + window.location.search
                    );
                  } catch (_err) {
                    // ignore
                  }
                }
              } catch (err) {
                setOpen(false);
              }
            }
          }}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                try {
                  setOpen(false);
                  const state = history.state as { gallery?: boolean } | null;
                  if (state && state.gallery) {
                    try {
                      history.replaceState(
                        null,
                        "",
                        window.location.pathname + window.location.search
                      );
                    } catch (_err) {
                      // ignore
                    }
                  }
                } catch (e) {
                  setOpen(false);
                }
              }}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
              aria-label="Close gallery"
            >
              <X />
            </button>

            <div className="relative overflow-hidden rounded-lg">
              <img
                src={images[index]}
                alt={`Project image ${index + 1} of ${images.length}`}
                className="w-full h-[70vh] object-contain bg-black"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
                    aria-label="Previous"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
                    aria-label="Next"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
