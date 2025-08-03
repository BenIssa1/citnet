'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ comment, name, email, saveInfo });
    // Here you would typically send the data to your backend
  };

  return (
    <div className="mt-8 sm:mt-12 pr-10">
      <p className="text-md sm:text-lg font-bold text-gray-900 mb-2">Avis</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Comment Textarea */}
        <div>
          <Textarea
            placeholder="Ton commentaire..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] sm:min-h-[120px] resize-none border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
          />
        </div>

        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
              Nom
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nom..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="save-info"
            checked={saveInfo}
            onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="save-info" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Enregistrer mon nom, mon adresse électronique dans ce navigateur pour la prochaine fois.
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          Poster un commentaire
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;