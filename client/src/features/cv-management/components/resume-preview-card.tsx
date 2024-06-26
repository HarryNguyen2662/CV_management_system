import type { Resume } from '@/interface/resume';

import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ResumePreviewCardProps {
  resume: Resume;
}

export const ResumePreviewCard = ({ resume }: ResumePreviewCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 border-solid border-2 h-fit border-neutral-400 rounded-md p-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-bold text-xl">{resume.profile.name}</p>
          <Button variant="outline" size="icon" onClick={() => navigate(`/resume/${resume.id}`)}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="">Uploaded: 26 Jun 2024</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='w-[100px] ml-auto'>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume from system?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resume and remove its data from the
              server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
