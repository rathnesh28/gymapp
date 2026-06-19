"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiErrorMessage } from "@/services/api";
import { genderService, type GenderOption } from "@/services/gender.service";

type GenderSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  name?: string;
};

export function GenderSelect({
  value,
  onValueChange,
  placeholder = "Select gender",
  name,
}: GenderSelectProps) {
  const [options, setOptions] = useState<GenderOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOptions() {
      setIsLoading(true);
      setError("");

      try {
        const data = await genderService.getGenderOptions();

        if (isMounted) {
          setOptions(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(getApiErrorMessage(loadError));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <Input disabled value="Loading genders..." />;
  }

  if (error) {
    return <Input disabled value={error} />;
  }

  return (
    <div className="grid gap-2">
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length === 0 ? (
            <SelectItem value="__empty" disabled>
              No genders available
            </SelectItem>
          ) : (
            options.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
