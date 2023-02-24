import { FC } from 'react'
import Button from '~/components/Button'

const Content: FC = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 lg:px-0 py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-7'>
        <div>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6461632064943!2d106.66984021524108!3d10.761729462406517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee3956af207%3A0x9a1edd7b0d5079bb!2zQ2FvIOG7kWMgQSAtIE5nw7QgR2lhIFThu7E!5e0!3m2!1svi!2s!4v1672739874620!5m2!1svi!2s'
            width={600}
            height={450}
            style={{ border: 0, width: '100%' }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
        <div>
          <h2 className='font-montserrat text-2xl text-text-22 pb-9 pt-4'>Sen us your message</h2>
          <form>
            <div className='w-full h-12 border border-[rgb(230, 230, 230)] rounded-sm mb-5'>
              <input
                type='text'
                placeholder='Họ và tên'
                className='h-full w-full px-5 outline-none font-montserrat text-sm text-[rgb(85, 85, 85)]'
              />
            </div>
            <div className='w-full h-12 border border-[rgb(230, 230, 230)] rounded-sm mb-5'>
              <input
                type='text'
                placeholder='Số điện thoại'
                className='h-full w-full px-5 outline-none font-montserrat text-sm text-[rgb(85, 85, 85)]'
              />
            </div>
            <div className='w-full h-12 border border-[rgb(230, 230, 230)] rounded-sm mb-5'>
              <input
                type='email'
                placeholder='Email'
                className='h-full w-full px-5 outline-none font-montserrat text-sm text-[rgb(85, 85, 85)]'
              />
            </div>
            <textarea
              rows={4}
              placeholder='Tin nhắn'
              className='w-full border border-[rgb(230, 230, 230)] rounded-sm mb-3 h-full px-5 py-3 outline-none font-montserrat text-sm text-[rgb(85, 85, 85)]'
            />
            <Button primary rounded custom='px-10'>
              Gửi
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Content
