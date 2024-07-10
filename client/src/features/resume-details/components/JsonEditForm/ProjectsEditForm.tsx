import type { ResumeProject } from '@/interface/resume';

import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ErrorMessage,Field, FieldArray, Form, Formik } from 'formik';
import { deepClone } from 'lib/deep-clone';
import { useEffect, useState } from 'react';
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

type ProjectField = 'project' | 'date' | 'descriptions';

interface formFieldType {
  field: ProjectField;
  label: string;
}

const formFields: formFieldType[] = [
  { field: 'project', label: 'Project' },
  { field: 'date', label: 'Date' },
];

const validationSchema = Yup.object({
  projects: Yup.array().of(
    Yup.object({
      project: Yup.string().required('Project is required'),
      date: Yup.string().required('Date is required'),
      descriptions: Yup.array().of(Yup.string()),
    })
  ),
});

const ProjectsEditForm = ({ projects }: { projects: ResumeProject[] }) => {
  const [initialValues, setInitialValues] = useState<{ projects: ResumeProject[] }>({
    projects: [],
  });

  useEffect(() => {
    if (projects) {
      setInitialValues({ projects: deepClone(projects) });
    }
  }, [projects]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px] max-h-[650px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Projects</DialogTitle>
          <DialogDescription>Make changes to your projects here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Submitted values:', values);
            
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-2 flex flex-col">
              <FieldArray name="projects">
                {({ remove, push }) => (
                  <div className="flex flex-col gap-4">
                    {values.projects.map((_each, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex gap-2 items-center mb-2">
                          <h3 className="font-bold">Project {index + 1}</h3>
                          <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                          {formFields.map((item, key) => (
                            <div key={key} className="flex items-center justify-between">
                              <Label>{item.label}</Label>
                              <div className="flex flex-col w-[85%]">
                                <Field
                                  name={`projects.${index}.${item.field}`}
                                  as={Input}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage
                                  name={`projects.${index}.${item.field}`}
                                  component="span"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <FieldArray name={`projects.${index}.descriptions`}>
                          {({ remove, push }) => (
                            <div className="flex flex-col gap-4 my-4">
                              {values.projects[index].descriptions.map((_, descIndex) => (
                                <div key={descIndex} className="flex flex-col gap-2">
                                  <Label>Description {descIndex + 1}</Label>
                                  <div className="flex gap-2">
                                    <Field
                                      name={`projects.${index}.descriptions.${descIndex}`}
                                      as={Input}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      type="button"
                                      onClick={() => remove(descIndex)}
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="secondary"
                                className="w-fit mx-auto"
                                onClick={() => push('')}
                              >
                                Add Description
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                        <Separator className="my-3" />
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => push({ project: '', date: '', descriptions: [] })}
                      className="w-fit mx-auto"
                      variant="secondary"
                    >
                      Add Project
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
  );
};

export default ProjectsEditForm;