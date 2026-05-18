"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";

import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/current-user";
import { usePostStore } from "@/store/post-store";

export default function CreatePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isSeller = currentUser.role === "seller";

  const [caption, setCaption] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const addPost = usePostStore((state) => state.addPost);
  const router = useRouter();
  // 👇 seller can choose post type
  const [postType, setPostType] = useState<"normal" | "product">(
    "normal"
  );

  const isProductPost = postType === "product";


  const handleSubmit = () => {
    if (!selectedImage) return;

    const newPost = {
      id: Date.now(),
      user: currentUser.username,
      avatar: currentUser.avatar,
      verified: currentUser.verified,
      image: selectedImage,
      caption,
      likes: 0,
      comments: 0,
      likedByMe: false,
      product: isProductPost
        ? {
          name: product,
          price,
        }
        : null,
    };

    addPost(newPost);

    router.push("/"); // یا فید اصلی
  };

  return (
    <div className="space-y-6 py-4">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">
          ایجاد پست
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          تجربه، محصول یا روزمرگی خودتو به اشتراک بذار
        </p>
      </div>

      {/* POST TYPE SWITCH */}
      {isSeller && (
        <div className="flex gap-2 rounded-2xl bg-muted p-1">

          <button
            onClick={() => setPostType("normal")}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition
            ${postType === "normal"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
              }`}
          >
            پست معمولی
          </button>

          <button
            onClick={() => setPostType("product")}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition
            ${postType === "product"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
              }`}
          >
            معرفی محصول
          </button>

        </div>
      )}

      {/* IMAGE PICKER */}
      <label
        className="relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-card transition hover:bg-muted/40"
      >

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            const imageUrl = URL.createObjectURL(file);

            setSelectedImage(imageUrl);
          }}
        />

        {selectedImage ? (
          <img
            src={selectedImage}
            alt="preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <ImagePlus
              size={40}
              className="text-muted-foreground"
            />

            <span className="text-sm text-muted-foreground">
              انتخاب تصویر
            </span>
          </>
        )}

      </label>

      {/* FORM */}
      <div className="space-y-4">

        {/* CAPTION */}
        <div className="space-y-2">

          <label className="text-sm font-medium">
            کپشن
          </label>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="چی تو ذهنته؟"
            className="min-h-32 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
          />

        </div>

        {/* PRODUCT MODE */}
        {isSeller && isProductPost && (
          <div className="space-y-4 rounded-3xl border border-border bg-card p-4">

            <div>
              <h2 className="font-medium">
                اطلاعات محصول
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                این اطلاعات زیر پست نمایش داده می‌شود
              </p>
            </div>

            {/* PRODUCT */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                نام محصول
              </label>

              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="مثلاً هدفون سونی"
                className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-primary"
              />

            </div>

            {/* PRICE */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                قیمت
              </label>

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="مثلاً ۲,۵۰۰,۰۰۰ تومان"
                className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-primary"
              />

            </div>

          </div>
        )}

      </div>

      {/* PREVIEW */}
      <div className="space-y-3 rounded-3xl border border-border bg-card p-4">

        <div className="flex items-center justify-between">

          <span className="text-sm font-medium">
            پیش‌نمایش پست
          </span>

          <span className="text-xs text-muted-foreground">
            @{currentUser.username}
          </span>

        </div>

        <div className="overflow-hidden rounded-2xl bg-muted aspect-square">

          {selectedImage ? (
            <img
              src={selectedImage}
              alt="preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              پیش‌نمایش تصویر
            </div>
          )}

        </div>

        {caption && (
          <p className="text-sm leading-7">
            {caption}
          </p>
        )}

        {isSeller && isProductPost && product && (
          <div className="flex items-center justify-between rounded-2xl bg-accent/20 p-3">

            <div className="text-sm font-medium">
              {product}
            </div>

            {price && (
              <div className="text-sm font-bold text-primary">
                {price}
              </div>
            )}

          </div>
        )}

      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="h-12 w-full rounded-2xl bg-primary font-medium text-primary-foreground transition hover:opacity-90"
      >
        انتشار پست
      </button>

    </div>
  );
}