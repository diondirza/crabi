import { App, Button, Flex, Form, Input, Typography } from 'antd';
import { useEffect, type FC } from 'react';
import { Container } from './RentalForm.styled';
import { RentalFormProps, RentalFormValues } from './types';

export const RentalForm: FC<RentalFormProps> = ({ available, name, hasReturnLocation, onRentClick, onReturnClick }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<RentalFormValues>();

  const handleFinish = (values: RentalFormValues) => {
    onRentClick(values.name);
    void message.success({
      content: `Dear ${values.name}, thank you for choosing us for your journey! Enjoy the ride.`,
    });
  };

  const handleReturn = () => {
    form.resetFields();
    onReturnClick();
    void message.success({ content: `Thank you for choosing our service, your car has been successfully returned.` });
  };

  useEffect(() => {
    form.setFieldsValue({ name });
  }, [name, form]);

  return (
    <Container>
      <Form form={form} name="rental-form" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={handleFinish}>
        {available && (
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}

        <Flex vertical gap={8} justify="center">
          {available ? (
            <Button htmlType="submit" type="primary">
              Rent
            </Button>
          ) : (
            <>
              {!hasReturnLocation && <Typography.Text>Please select the return location on the map!</Typography.Text>}
              <Button disabled={!hasReturnLocation} htmlType="button" type="primary" onClick={handleReturn}>
                Return
              </Button>
            </>
          )}
        </Flex>
      </Form>
    </Container>
  );
};
