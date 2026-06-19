"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GenderSelect } from "@/components/gender-select";
import { PackageSelect } from "@/components/package-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getApiErrorMessage } from "@/services/api";
import {
  memberService,
  type Member,
  type UpdateMemberPayload,
} from "@/services/member.service";

const fallbackMembers: Member[] = [
  {
    id: "1",
    name: "Riya Mehta",
    mobile: "+91 98765 43210",
    package: "Elite Annual",
    joined: "2026-06-12",
    status: "Active",
  },
  {
    id: "2",
    name: "Kabir Singh",
    mobile: "+91 99887 76655",
    package: "Strength Pro",
    joined: "2026-06-08",
    status: "Active",
  },
  {
    id: "3",
    name: "Maya Nair",
    mobile: "+91 91234 56789",
    package: "Yoga Plus",
    joined: "2026-05-28",
    status: "Pending",
  },
];

const statusVariant = {
  Active: "success",
  Pending: "warning",
  Inactive: "secondary",
} as const;

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function resolveMemberId(member: Member) {
  return member.id ?? member._id ?? member.mobile;
}

export function MembersTable({
  members = fallbackMembers,
  onMemberUpdated,
  onMemberDeleted,
}: {
  members?: Member[];
  onMemberUpdated?: (member: Member) => void;
  onMemberDeleted?: (id: string) => void;
}) {
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleUpdate(payload: UpdateMemberPayload) {
    if (!editingMember) return;

    const id = resolveMemberId(editingMember);
    setIsSaving(true);
    setError("");

    try {
      const updatedMember = await memberService.updateMember(id, payload);
      onMemberUpdated?.(updatedMember);
      setEditingMember(null);
    } catch (updateError) {
      setError(getApiErrorMessage(updateError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!memberToDelete) return;

    const id = resolveMemberId(memberToDelete);
    setIsDeleting(true);
    setError("");

    try {
      await memberService.deleteMember(id);
      onMemberDeleted?.(id);
      setMemberToDelete(null);
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError));
    } finally {
      setIsDeleting(false);
    }
  }

  if (members.length === 0) {
    return (
      <>
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No members found.
        </div>
        <MemberEditorDialog
          key={editingMember ? resolveMemberId(editingMember) : "empty"}
          open={Boolean(editingMember)}
          member={editingMember}
          saving={isSaving}
          error={error}
          onOpenChange={(open) => !open && setEditingMember(null)}
          onSave={handleUpdate}
        />
        <DeleteMemberDialog
          open={Boolean(memberToDelete)}
          member={memberToDelete}
          deleting={isDeleting}
          error={error}
          onOpenChange={(open) => !open && setMemberToDelete(null)}
          onConfirm={handleDelete}
        />
      </>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => {
            const id = resolveMemberId(member);

            return (
              <TableRow key={id ?? index}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell className="text-muted-foreground">{member.mobile}</TableCell>
                <TableCell>{member.packageName ?? member.package ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(member.joinDate ?? member.joined)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      statusVariant[
                        (member.status ?? "Active") as keyof typeof statusVariant
                      ] ?? "outline"
                    }
                  >
                    {member.status ?? "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open member actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingMember(member)}>
                        <Pencil className="size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setMemberToDelete(member)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MemberEditorDialog
        key={editingMember ? resolveMemberId(editingMember) : "empty"}
        open={Boolean(editingMember)}
        member={editingMember}
        saving={isSaving}
        error={error}
        onOpenChange={(open) => !open && setEditingMember(null)}
        onSave={handleUpdate}
      />
      <DeleteMemberDialog
        open={Boolean(memberToDelete)}
        member={memberToDelete}
        deleting={isDeleting}
        error={error}
        onOpenChange={(open) => !open && setMemberToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

function MemberEditorDialog({
  open,
  member,
  saving,
  error,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  member: Member | null;
  saving: boolean;
  error: string;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: UpdateMemberPayload) => void;
}) {
  const [name, setName] = useState(member?.name ?? "");
  const [mobile, setMobile] = useState(member?.mobile ?? "");
  const [email, setEmail] = useState(member?.email ?? "");
  const [gender, setGender] = useState(member?.gender ?? "");
  const [address, setAddress] = useState(member?.address ?? "");
  const [packageName, setPackageName] = useState(member?.packageName ?? member?.package ?? "");
  const [joinDate, setJoinDate] = useState(member?.joinDate ?? member?.joined ?? "");
  const [status, setStatus] = useState(member?.status ?? "Active");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      name,
      mobile,
      email,
      gender,
      address,
      package: packageName,
      joinDate,
      status,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit member</DialogTitle>
          <DialogDescription>
            Update the member record and save the changes.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={submit} key={member?.id ?? member?._id ?? member?.mobile}>
          {error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </Field>
            <Field label="Mobile">
              <Input value={mobile} onChange={(event) => setMobile(event.target.value)} />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Email">
              <Input value={email} onChange={(event) => setEmail(event.target.value)} />
            </Field>
            <Field label="Gender">
              <GenderSelect value={gender} onValueChange={setGender} />
            </Field>
          </div>
          <Field label="Address">
            <Input value={address} onChange={(event) => setAddress(event.target.value)} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Package">
              <PackageSelect
                value={packageName}
                onValueChange={setPackageName}
                name="package"
              />
            </Field>
            <Field label="Join date">
              <Input
                type="date"
                value={joinDate}
                onChange={(event) => setJoinDate(event.target.value)}
              />
            </Field>
          </div>
          <Field label="Status">
            <select
              value={status ?? "Active"}
              onChange={(event) => setStatus(event.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteMemberDialog({
  open,
  member,
  deleting,
  error,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  member: Member | null;
  deleting: boolean;
  error: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete member?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes {member?.name ?? "the selected member"} from the list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
