"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { MembersTable } from "@/components/members-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/services/api";
import { memberService, type Member } from "@/services/member.service";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMembers() {
      setIsLoading(true);
      setError("");

      try {
        const data = await memberService.getMembers();

        if (isMounted) {
          setMembers(data);
        }
      } catch (memberError) {
        if (isMounted) {
          setError(getApiErrorMessage(memberError));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return members;
    }

    return members.filter((member) =>
      [member.name, member.mobile, member.email, member.package, member.packageName]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query)),
    );
  }, [members, search]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Members</h1>
            <p className="mt-2 text-muted-foreground">
              Search, review, and manage your member roster.
            </p>
          </div>
          <Button asChild>
            <Link href="/members/add">
              <Plus className="size-4" />
              Add Member
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Members table</CardTitle>
              <CardDescription>
                Loaded from GET /members with client-side search.
              </CardDescription>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search member..."
                className="pl-9"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : isLoading ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                Loading members...
              </div>
            ) : (
              <MembersTable
                members={filteredMembers}
                onMemberUpdated={(updatedMember) =>
                  setMembers((currentMembers) =>
                    currentMembers.map((member) => {
                      const memberId = member.id ?? member._id ?? member.mobile;
                      const updatedId =
                        updatedMember.id ?? updatedMember._id ?? updatedMember.mobile;

                      return memberId === updatedId ? updatedMember : member;
                    }),
                  )
                }
                onMemberDeleted={(deletedId) =>
                  setMembers((currentMembers) =>
                    currentMembers.filter((member) => {
                      const memberId = member.id ?? member._id ?? member.mobile;
                      return memberId !== deletedId;
                    }),
                  )
                }
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
