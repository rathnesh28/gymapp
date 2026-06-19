"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/services/api";
import { genderService, type GenderOption } from "@/services/gender.service";
import { memberService } from "@/services/member.service";
import { packageService, type PackageOption } from "@/services/package.service";

export default function AddMemberPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [pkg, setPkg] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [packageOptions, setPackageOptions] = useState<PackageOption[]>([]);
  const [genderOptions, setGenderOptions] = useState<GenderOption[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingGenders, setLoadingGenders] = useState(true);
  const [packageError, setPackageError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPackages() {
      setLoadingPackages(true);
      setPackageError("");

      try {
        const data = await packageService.getPackageOptions();

        if (isMounted) {
          setPackageOptions(data);
        }
      } catch (error) {
        if (isMounted) {
          setPackageError(getApiErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setLoadingPackages(false);
        }
      }
    }

    loadPackages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadGenders() {
      setLoadingGenders(true);
      setGenderError("");

      try {
        const data = await genderService.getGenderOptions();

        if (isMounted) {
          setGenderOptions(data);
        }
      } catch (error) {
        if (isMounted) {
          setGenderError(getApiErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setLoadingGenders(false);
        }
      }
    }

    loadGenders();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setSubmitError("");

    try {
      await memberService.addMember({
        name,
        mobile,
        email,
        gender,
        address,
        package: pkg,
        joinDate,
      });

      setName("");
      setMobile("");
      setEmail("");
      setGender("");
      setAddress("");
      setPkg("");
      setJoinDate("");
      alert("Member Added Successfully");
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Add Member</h1>
          <p className="mt-2 text-muted-foreground">
            Register a new gym member with package and joining details.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member information</CardTitle>
              <CardDescription>
                The gender and package fields load from the backend list APIs.
              </CardDescription>
          </CardHeader>
          <CardContent>
            <Form className="grid gap-5" onSubmit={handleSubmit}>
              {submitError ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {submitError}
                </div>
              ) : null}

              <div className="grid gap-5 md:grid-cols-2">
                <FormField name="name">
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl asChild>
                      <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Priya Sharma"
                      />
                    </FormControl>
                    <FormMessage match="valueMissing">
                      Member name is required.
                    </FormMessage>
                  </FormItem>
                </FormField>

                <FormField name="mobile">
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl asChild>
                      <Input
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormField name="email">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl asChild>
                      <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="member@example.com"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              
                <FormField name="gender">
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    {loadingGenders ? (
                      <Input disabled value="Loading genders..." />
                    ) : genderError ? (
                      <Input disabled value={genderError} />
                    ) : (
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                      >
                       
                        <option value="">Select gender</option>
                        {genderOptions.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </FormItem>
                </FormField>
              </div>

              <FormField name="address">
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl asChild>
                    <Input
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Bandra West, Mumbai"
                    />
                  </FormControl>
                </FormItem>
              </FormField>

              <div className="grid gap-5 md:grid-cols-2">
                <FormField name="package">
                  <FormItem>
                    <FormLabel>Package selection</FormLabel>
                    {loadingPackages ? (
                      <Input disabled value="Loading packages..." />
                    ) : packageError ? (
                      <Input disabled value={packageError} />
                    ) : (
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none"
                        value={pkg}
                        onChange={(event) => setPkg(event.target.value)}
                      >
                        <option value="">Choose package</option>
                        {packageOptions.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </FormItem>
                </FormField>

                <FormField name="joinDate">
                  <FormItem>
                    <FormLabel>Join Date</FormLabel>
                    <FormControl asChild>
                      <Input
                        type="date"
                        value={joinDate}
                        onChange={(event) => setJoinDate(event.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => {
                    setName("");
                    setMobile("");
                    setEmail("");
                    setGender("");
                    setAddress("");
                    setPkg("");
                    setJoinDate("");
                    setSubmitError("");
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving || loadingPackages || loadingGenders}
                >
                  {isSaving ? "Saving..." : "Submit Member"}
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
