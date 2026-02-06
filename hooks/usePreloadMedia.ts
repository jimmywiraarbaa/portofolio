"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Preload result interface
 */
interface PreloadResult {
  progress: number;
  isLoaded: boolean;
  error: string | null;
}

/**
 * Media source configuration for video with fallbacks
 */
interface MediaSource {
  type: "video" | "image";
  src: string;
  poster?: string;
  fallback?: string;
}

/**
 * Custom hook to preload media assets with progress tracking
 *
 * Features:
 * - Progress percentage tracking
 * - Video poster image preloading
 * - Multiple format fallback support
 * - Error handling and recovery
 * - Cleanup on unmount
 *
 * @param sources - Array of media sources to preload
 * @param delay - Minimum delay in ms (for smooth loading animation)
 */
export function usePreloadMedia(
  sources: MediaSource[],
  delay: number = 1500
): PreloadResult {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadedItemsRef = useRef<Set<string>>(new Set());
  const startTimeRef = useRef<number>(Date.now());

  const loadVideo = useCallback(
    (src: string, poster?: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Create a video element to preload
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;

        // Load poster first if provided
        const loadPoster = poster
          ? new Promise<void>((posterResolve) => {
              const img = new Image();
              img.onload = () => posterResolve();
              img.onerror = () => posterResolve(); // Continue on poster error
              img.src = poster;
            })
          : Promise.resolve();

        loadPoster.then(() => {
          video.src = src;

          video.addEventListener("loadeddata", () => {
            // Ensure we can play the video
            video
              .play()
              .then(() => {
                video.pause();
                URL.revokeObjectURL(video.src);
                resolve();
              })
              .catch(() => {
                // Can play but can't autoplay (browser policy)
                resolve();
              });
          });

          video.addEventListener("error", () => {
            reject(new Error(`Failed to load video: ${src}`));
          });
        });
      });
    },
    []
  );

  const loadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const totalItems = sources.length;
    let isMounted = true;

    const loadMedia = async () => {
      try {
        for (const source of sources) {
          if (!isMounted) return;

          try {
            if (source.type === "video") {
              await loadVideo(source.src, source.poster);
            } else {
              await loadImage(source.src);
            }

            if (isMounted) {
              loadedItemsRef.current.add(source.src);
              const newProgress =
                (loadedItemsRef.current.size / totalItems) * 100;
              setProgress(newProgress);
            }
          } catch (err) {
            // Try fallback if available
            if (source.fallback && isMounted) {
              try {
                if (source.type === "video") {
                  await loadVideo(source.fallback, source.poster);
                } else {
                  await loadImage(source.fallback);
                }
                loadedItemsRef.current.add(source.src);
                const newProgress =
                  (loadedItemsRef.current.size / totalItems) * 100;
                setProgress(newProgress);
              } catch (fallbackErr) {
                setError(
                  `Failed to load media: ${
                    err instanceof Error ? err.message : String(err)
                  }`
                );
              }
            }
          }
        }

        // Ensure minimum delay for smooth loading animation
        const elapsed = Date.now() - startTimeRef.current;
        const remainingDelay = Math.max(0, delay - elapsed);

        if (isMounted) {
          setTimeout(() => {
            if (isMounted) {
              setProgress(100);
              setIsLoaded(true);
            }
          }, remainingDelay);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load media"
          );
          setIsLoaded(true); // Continue even on error
        }
      }
    };

    loadMedia();

    return () => {
      isMounted = false;
    };
  }, [sources, delay, loadVideo, loadImage]);

  return { progress, isLoaded, error };
}

/**
 * Hook to preload fonts with Promise-based API
 */
export function useFontPreload(fontFamilies: string[]): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const loadFonts = async () => {
      try {
        // Wait for fonts to be loaded using document.fonts API
        await Promise.all(
          fontFamilies.map((family) =>
            document.fonts.load(`16px "${family}"`)
          )
        );
        setLoaded(true);
      } catch {
        // Font loading failed, but continue anyway
        setLoaded(true);
      }
    };

    loadFonts();
  }, [fontFamilies]);

  return loaded;
}
