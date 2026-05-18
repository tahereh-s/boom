"use client";

import { useState } from "react";

import Image from "next/image";

import { ImagePlus } from "lucide-react";

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const [caption, setCaption] = useState("");

  const [productName, setProductName] = useState("");

  const [price, setPrice] = useState("");

  // IMAGE PICK
  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  // SUBMIT
  const handleSubmit = () => {
    const newPost = {
      image: preview,
      caption,
      product: {
        name: productName,
        price,
      },
    };

    console.log(newPost);

    alert("پست منتشر شد 🚀");
  };

  return (
    <main className="mx-auto max-w-2xl p-4">

      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold">
            ساخت پست
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            محتوای جدید منتشر کن ✨
          </p>

        </div>

        {/* IMAGE PICKER */}
        <label
          className="
            flex
            aspect-square
            cursor-pointer
            items-center
            justify-center
            overflow-hidden
            rounded-3xl
            border-2
            border-dashed
            border-border
            bg-muted
          "
        >

          {preview ? (
            <div className="relative h-full w-full">

              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover"
              />

            </div>
          ) : (
            <div className="text-center">

              <ImagePlus
                className="mx-auto mb-3 text-muted-foreground"
                size={40}
              />

              <p className="text-sm text-muted-foreground">
                انتخاب تصویر
              </p>

            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />

        </label>

        {/* FORM */}
        <div className="mt-6 space-y-4">

          {/* CAPTION */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="کپشن پست..."
            className="
              min-h-32
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              p-4
              text-sm
              outline-none
            "
          />

          {/* PRODUCT NAME */}
          <input
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
            placeholder="نام محصول"
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              p-3
              text-sm
              outline-none
            "
          />

          {/* PRICE */}
          <input
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="قیمت"
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              p-3
              text-sm
              outline-none
            "
          />

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="
              w-full
              rounded-2xl
              bg-primary
              py-3
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
            "
          >
            انتشار پست
          </button>

        </div>

      </div>

    </main>
  );
}