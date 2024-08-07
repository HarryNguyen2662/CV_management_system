import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateSkillsByIdMutation } from '@/services/apiSlice';

const validationSchema = Yup.object({
  descriptions: Yup.array().of(Yup.string().required('Description is required')),
});

type ResumeSkills = {
  descriptions: string[];
};

const SkillsEditForm = ({ skills }: { skills: ResumeSkills }) => {
  const [updateSkills, { isLoading }] = useUpdateSkillsByIdMutation();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const [initialValues, setInitialValues] = useState<ResumeSkills>({ descriptions: [] });

  useEffect(() => {
    if (skills) {
      setInitialValues(skills);
    }
  }, [skills]);

  const handleSubmit = async (values: ResumeSkills) => {
    if (!isLoading && id) {
      try {
        await updateSkills({ skills: values, id }).unwrap();
        toast({
          title: 'Successful!',
          description: 'Skills have been updated.',
          className: 'bg-green-200',
        });
      } catch (err) {
        console.error('Failed to update skills: ', err);
        toast({
          title: 'Failed!',
          description: 'Failed to update skills.',
          className: 'bg-red-200',
        });
      }
    }

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Pencil2Icon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[600px] max-h-[650px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Skills</DialogTitle>
            <DialogDescription>Make changes to your skills here. Click save when you're done.</DialogDescription>
          </DialogHeader>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="space-y-2 flex flex-col">
                <FieldArray name="descriptions">
                  {({ remove, push }) => (
                    <div className="flex flex-col gap-4">
                      {values.descriptions.map((_, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex gap-2 items-center mb-2">
                            <h3 className="font-bold">Description {index + 1}</h3>
                            <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Description</Label>
                            <div className="flex flex-col w-[85%]">
                              <Field
                                name={`descriptions.${index}`}
                                as={Input}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <ErrorMessage
                                name={`descriptions.${index}`}
                                component="span"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                          <Separator className="my-3" />
                        </div>
                      ))}
                      <Button type="button" onClick={() => push('')} className="w-fit mx-auto" variant="secondary">
                        Add Description
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <Button type="submit" className="w-[80px] ml-auto">
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default SkillsEditForm;
