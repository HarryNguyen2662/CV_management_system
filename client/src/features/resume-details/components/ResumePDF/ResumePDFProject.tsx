import type { ResumeProject } from 'lib/redux/types';

import { View } from '@react-pdf/renderer';

import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from './common';
import { spacing,styles } from './styles';

export const ResumePDFProject = ({
  heading,
  projects,
  themeColor,
}: {
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {projects.map(({ project, date, descriptions }, idx) => (
        <View key={idx}>
          <View
            style={{
              ...styles.flexRowBetween,
              marginTop: spacing['0.5'],
            }}
          >
            <ResumePDFText bold={true}>{project}</ResumePDFText>
            <ResumePDFText>{date}</ResumePDFText>
          </View>
          <View style={{ ...styles.flexCol, marginTop: spacing['0.5'] }}>
            <ResumePDFBulletList items={descriptions} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};
