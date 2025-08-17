'use client'

import { userFormData } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import UserTable from "@/components/data-table/UserTable";
import UserModal from "@/components/forms/UserModal";
import { editUser, signupUser } from "@/services/auth";
import { CreateUserData, SignupFormValues, UserEditData } from "@/types/auth";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editUserData, setEditUserData] = useState<UserEditData | null>(null);
  const [selectedUserId, setSelecteduserId] = useState<string | null>(null);
  const [confirmDeleteUserOpen, setConfirmDeleteUserOpen] = useState(false);

  const queryClient = useQueryClient();


  const createUserMutation = useMutation({
    mutationFn: async ({ email, lastName, firstName }: SignupFormValues) =>
      await signupUser(email, lastName, firstName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
      toast.success('user créé avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de création');
      } else {
        toast.error('Erreur lors de la création');
      }
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, ...rest }: UserEditData) => editUser(id, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
      toast.success('user modifié avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de modification');
      } else {
        toast.error('Erreur lors de la modification');
      }
    },
  });


  const handleAgentSubmit = (data: userFormData) => {
    const apiData = {
      email: data.email,
      lastName: data.lastName,
      firstName: data.firstName,
    };

    if (editUserData) {
      const editData: UserEditData = {
        id: editUserData.id,
        ...apiData,
      };

      updateUserMutation.mutate(editData);
    } else {
      const createData: CreateUserData = {
        ...apiData,
      };

      createUserMutation.mutate(createData);
    }
  };

  return (
    <div className="p-4">
      <h3 className='text-xl font-bold mb-3'>Gestion des users</h3>

      <UserTable
        onEditUserData={setEditUserData}
        onIsEditing={setIsEditing}
        onOpen={setOpen}
        onSetConfirmDeleteuserOpen={setConfirmDeleteUserOpen}
        onSetSelecteduserId={setSelecteduserId}
        buttonComponent={
          <UserModal
            initialData={editUserData ?? undefined}
            isEditing={isEditing}
            onSubmit={handleAgentSubmit}
            isLoading={createUserMutation.isPending || updateUserMutation.isPending}
            open={open}
            setOpen={setOpen}
          />
        }
      />
    </div>
  )
}