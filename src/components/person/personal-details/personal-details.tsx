import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Tag,
  Typography
} from 'antd';
import moment from 'moment';
import { useContext, useState } from 'react';
import { PersonContext } from '../../../services/person-context';
import { useGetArrayData } from '../../../services/useGetArrayData';
import { IdList } from './id-list';
import { LinkList } from './link-list';
import { NameVariantList } from './name-variant-list';
import { OrcidIDList } from './orcid-id-list';
import { TitleList } from './title-list';
const { Option } = Select;
const { Panel } = Collapse;
const { Text } = Typography;

export const PersonalDetails = () => {
  const countries = useGetArrayData('countries');
  const personContext = useContext(PersonContext);
  const nameVariantTypes = useGetArrayData('nameVariantTypes');
  const titleTypes = useGetArrayData('titleTypes');
  const linkTypes = useGetArrayData('linkTypes');
  const current = personContext.current();
  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  if (current === undefined) {
    return null;
  }
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label='Forename'>
            <Input
              type={'text'}
              value={current.forename}
              onChange={(v) => {
                personContext.update({ ...current, forename: v.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label='Surname'>
            <Input
              type={'text'}
              value={current.surname}
              onChange={(v) =>
                personContext.update({ ...current, surname: v.target.value })
              }
            ></Input>
          </Form.Item>
          <Form.Item label='Gender'>
            <Select
              showSearch
              value={current.gender}
              style={{ width: 200 }}
              placeholder='Search to Select'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toLowerCase()
                  )
              }
              onChange={(v) => personContext.update({ ...current, gender: v })}
            >
              <Option value='Male'>Male</Option>
              <Option value='Female'>Female</Option>
              <Option value='Unknown'>Unknown</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          {' '}
          <Form.Item label='Date of Birth'>
            <DatePicker
              allowClear={false}
              value={moment(current.dob)}
              onChange={(v) =>
                personContext.update({ ...current, dob: v?.toJSON() ?? '' })
              }
            />
          </Form.Item>
          <Form.Item label='Nationality'>
            <Select
              showSearch
              value={current.nationality}
              style={{ width: 200 }}
              placeholder='Search to Select'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toLowerCase()
                  )
              }
              onChange={(v) =>
                personContext.update({ ...current, nationality: v })
              }
            >
              {countries.map((x) => (
                <Option key={x} value={x}>
                  {x}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Start date as independent researched'>
            <DatePicker
              allowClear={false}
              value={moment(current.startDateAsIndependentResearcher)}
              onChange={(v) =>
                personContext.update({
                  ...current,
                  startDateAsIndependentResearcher: v?.toJSON() ?? ''
                })
              }
            />
          </Form.Item>
          <Form.Item label='Retirement date'>
            <DatePicker
              allowClear={false}
              value={moment(current.retirementDate)}
              onChange={(v) =>
                personContext.update({
                  ...current,
                  retirementDate: v?.toJSON() ?? ''
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        <Panel
          key={'variant-list'}
          header={'Variants'}
          extra={current.nameVariants.map((v, i) => (
            <span key={i}>
              <Text>
                {v.forename} {v.surname}{' '}
              </Text>
              <Tag color='processing'>{v.type}</Tag>
            </span>
          ))}
        >
          <NameVariantList
            nameVariants={current.nameVariants}
            nameVariantTypes={nameVariantTypes}
            onChange={(v) =>
              personContext.update({ ...current, nameVariants: v })
            }
          />
        </Panel>
        <Panel
          key={'title-list'}
          header={`Titles`}
          extra={current.titles.map((v, i) => (
            <span key={i}>
              <Text>{v.title} </Text>
              <Tag color='processing'>{v.type}</Tag>
            </span>
          ))}
        >
          <TitleList
            titles={current.titles}
            titleTypes={titleTypes}
            onChange={(v) => personContext.update({ ...current, titles: v })}
          />
        </Panel>
        <Panel
          key={'id-list'}
          header={`IDs`}
          extra={current.personId.map((v, i) => (
            <span key={i}>
              <Text>{v.id} </Text>
              <Tag color='processing'>{v.type}</Tag>
            </span>
          ))}
        >
          <IdList
            ids={current.personId}
            idTypes={[]}
            onChange={(v) => personContext.update({ ...current, personId: v })}
          />
        </Panel>
        <Panel
          key={'orcidID-list'}
          header={`Orcid IDs`}
          extra={current.orcidId.map((v, i) => (
            <span key={i}>
              <Tag color='processing'>{v}</Tag>{' '}
            </span>
          ))}
        >
          <OrcidIDList
            orcidIDs={current.orcidId}
            onChange={(v) => personContext.update({ ...current, orcidId: v })}
          />
        </Panel>
        <Panel
          key={'link-list'}
          header={`Links`}
          extra={
            <Tag color='processing'>{`${current.links.length} link${
              current.links.length > 0 ? 's' : ''
            }`}</Tag>
          }
        >
          <LinkList
            links={current.links}
            linkTypes={linkTypes}
            onChange={(v) => personContext.update({ ...current, links: v })}
          />
        </Panel>
      </Collapse>
    </>
  );
};
